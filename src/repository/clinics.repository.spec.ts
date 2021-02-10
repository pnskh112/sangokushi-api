import { ClinicsRepository } from './clinics.repository';
import { Connection, QueryRunner } from 'typeorm';
import { DBConnection } from '../component/database/dbconnection';
import { Clinic } from 'src/domain/clinic/clinic.domain';
import { Clinics } from 'src/domain/clinic/clinics.domain';
import { AlreadyExistsException } from 'src/component/exception/alreadyExists.exception';
import { NotFoundException } from 'src/component/exception/notFound.exception';
import { Pager } from 'src/domain/core/pager/pager.domain';

describe('ClinicsRepository', () => {
    let queryRunner: QueryRunner;
    let connection: Connection;
    let repository: ClinicsRepository;

    beforeEach(async () => {
        connection = await DBConnection.get();
        queryRunner = connection.createQueryRunner();
        await queryRunner.startTransaction();
        repository = new ClinicsRepository(queryRunner.manager);
    });

    it('定義されているか', () => {
        expect(repository).toBeDefined();
    });

    describe('create', () => {
        it('作成できるか', async () => {
            const res = await repository.create(
                new Clinic({
                    crmShopId: '111',
                    crmShopName: '接骨院',
                    crmCompanyId: '11111',
                }),
            );
            expect(res).toBeDefined();
            expect(res).toHaveProperty('id');
        });
        it('crmShopIdとcrmCompanyIdが同じ組み合わせでエラーが発生するか', async () => {
            expect.assertions(2);
            await repository.create(
                new Clinic({
                    crmShopId: '111',
                    crmShopName: '接骨院',
                    crmCompanyId: '11111',
                }),
            );
            await repository
                .create(
                    new Clinic({
                        crmShopId: '111',
                        crmShopName: '接骨院',
                        crmCompanyId: '11111',
                    }),
                )
                .catch(e => {
                    expect(e.status).toBe(409);
                    expect(e).toBeInstanceOf(AlreadyExistsException);
                });
        });
    });

    describe('update', () => {
        it('更新できるか', async () => {
            const res1 = await repository.create(
                new Clinic({
                    crmShopId: '112',
                    crmShopName: '接骨院',
                    crmCompanyId: '11112',
                }),
            );
            const res2 = await repository.update(
                new Clinic({
                    id: res1.id,
                    crmShopId: '112',
                    crmShopName: '接骨院2',
                    crmCompanyId: '11112',
                }),
            );
            expect(res2).toBeDefined();
            expect(res2).toHaveProperty('id');
            expect(res2.id).toBe(res1.id);
        });
        it('存在しないIDを指定してNotFoundエラーが発生するか', async () => {
            expect.assertions(2);
            await repository
                .update(
                    new Clinic({
                        id: 11511,
                        crmShopId: '111',
                        crmShopName: '接骨院',
                        crmCompanyId: '11113',
                    }),
                )
                .catch(e => {
                    expect(e.status).toBe(404);
                    expect(e).toBeInstanceOf(NotFoundException);
                });
        });
    });

    describe('delete', () => {
        it('削除できるか', async () => {
            expect.assertions(2);
            const res1 = await repository.create(
                new Clinic({
                    crmShopId: '111',
                    crmShopName: '接骨院',
                    crmCompanyId: '11111',
                }),
            );
            const res2 = await repository.delete(res1.id);
            expect(res2).toBeDefined();
            expect(res2).toStrictEqual(res1);
        });
        it('存在しないIDを入れてNotFoundエラーが発生するか', async () => {
            expect.assertions(2);
            await repository.delete(11111).catch(e => {
                expect(e.status).toBe(404);
                expect(e).toBeInstanceOf(NotFoundException);
            });
        });
    });

    describe('get', () => {
        it('取得できるか', async () => {
            await repository.create(
                new Clinic({
                    crmShopId: '111',
                    crmShopName: '接骨院',
                    crmCompanyId: '11111',
                }),
            );
            const res = await repository.find(new Clinics());
            expect(res).toBeDefined();
            expect(res.toArray()[0]).toHaveProperty('id');
            expect(res.toArray()[0]).toHaveProperty('crmShopId');
            expect(res.toArray()[0]).toHaveProperty('crmShopName');
            expect(res.toArray()[0]).toHaveProperty('crmCompanyId');
        });
        it('IDを指定して取得できるか', async () => {
            const res1 = await repository.create(
                new Clinic({
                    crmShopId: '111',
                    crmShopName: '接骨院',
                    crmCompanyId: '11111',
                }),
            );
            const res2 = await repository.find(
                new Clinics({
                    searchParams: {
                        clinic: {
                            id: res1.id,
                        },
                    },
                }),
            );
            expect(res2).toBeDefined();
            expect(res2.toArray()[0].id).toBe(res1.id);
        });
        it('sizeとpageオプションを入れて取得できるか', async () => {
            await repository.create(
                new Clinic({
                    crmShopId: '111',
                    crmShopName: '接骨院',
                    crmCompanyId: '11111',
                }),
            );
            const res2 = await repository.find(
                new Clinics({
                    searchParams: {
                        pager: Pager.build({
                            size: '1',
                            page: '1',
                        }),
                    },
                }),
            );
            expect(res2).toBeDefined();
            expect(res2.pager.size).toBe(1);
            expect(res2.pager.page).toBe(1);
        });
    });

    afterEach(async () => {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        await DBConnection.close();
    });
});
