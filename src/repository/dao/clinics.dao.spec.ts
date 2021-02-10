import { validateSync } from 'class-validator';
import { ClinicsDAO, ClinicEntity } from './clinics.dao';
import { DBConnection } from '../../component/database/dbconnection';
import {
    setUpDummyClinics,
    cleanupDummyClinics,
    deleteClinicFromId,
} from 'src/component/testing/clinicsTestHelper';
import { Clinic } from 'src/domain/clinic/clinic.domain';
import { NotFoundException } from 'src/component/exception/notFound.exception';
import { InternalServerErrorException } from 'src/component/exception/internalServerError.exception';
import { EntityManager } from 'typeorm';

describe('ClinicsDAO', () => {
    let dao: ClinicsDAO;
    let entity: ClinicEntity;
    let manager: EntityManager;

    describe('ClinicEntity', () => {
        it('全てのパラメータを入れて初期化できるか', () => {
            entity = new ClinicEntity({
                id: 1,
                crmShopId: '111',
                crmShopName: '接骨院',
                crmCompanyId: '11111',
            });
            expect(entity).toBeDefined();
            expect(validateSync(entity).length).toBe(0);
            expect(entity).toHaveProperty('id');
            expect(entity).toHaveProperty('crmShopId');
            expect(entity).toHaveProperty('crmShopName');
            expect(entity).toHaveProperty('crmCompanyId');
        });
        it('全てにundefinedを入れてバリデーションエラーが発生するか', () => {
            const wrongParam: any = {
                id: undefined,
                crmShopId: undefined,
                crmShopName: undefined,
                crmCompanyId: undefined,
            };
            entity = new ClinicEntity(wrongParam);
            expect(validateSync(entity).length).toBe(3);
        });
    });

    describe('ClinicsDAO', () => {
        let dummyRes: any;
        beforeEach(async () => {
            manager = await DBConnection.getManager();
            dao = new ClinicsDAO(manager);
            dummyRes = await setUpDummyClinics(manager);
        });

        describe('create', () => {
            it('作成できるか', async () => {
                const res = await dao.create({
                    crmShopId: '111',
                    crmShopName: '接骨院',
                    crmCompanyId: '11111',
                });
                expect(res).toBeDefined();
                expect(typeof res.id).toBe('number');
                await deleteClinicFromId(manager, res.id);
            });
            it('buildPostResultでエラーが発生するか', async () => {
                expect.assertions(3);
                const wrongParam: any = 'invalid';
                try {
                    ClinicsDAO['buildPostResult'](wrongParam);
                } catch (e) {
                    expect(e).toBeDefined();
                    expect(e.status).toBe(500);
                    expect(e).toBeInstanceOf(InternalServerErrorException);
                }
            });
        });

        describe('update', () => {
            it('更新できるか', async () => {
                const res = await dao.update({
                    crmShopId: '009',
                    crmShopName: '接骨院',
                    crmCompanyId: '00009',
                });
                expect(res).toBeDefined();
                expect(res.id).toBe(dummyRes[0].ID);
                await deleteClinicFromId(manager, res.id);
            });
            it('buildUpdatedResultでエラーが発生するか', async () => {
                expect.assertions(6);
                const wrongParam: any = 'invalid';
                try {
                    ClinicsDAO['buildUpdatedResult'](wrongParam);
                } catch (e) {
                    expect(e).toBeDefined();
                    expect(e.status).toBe(500);
                    expect(e).toBeInstanceOf(InternalServerErrorException);
                }
                try {
                    ClinicsDAO['buildUpdatedResult']([[undefined]]);
                } catch (e) {
                    expect(e).toBeDefined();
                    expect(e.status).toBe(404);
                    expect(e).toBeInstanceOf(NotFoundException);
                }
            });
        });

        describe('delete', () => {
            it('削除できるか', async () => {
                const res = await dao.delete(dummyRes[0].ID);
                expect(res).toBeDefined();
                expect(res.id).toBe(dummyRes[0].ID);
            });
        });

        describe('find', () => {
            it('取得できるか', async () => {
                const res = await dao.find({});
                expect(res).toBeDefined();
                expect(res).toHaveProperty('data');
                expect(res).toHaveProperty('found');
                expect(res.data.length).toBeGreaterThan(0);
            });
            it('idで指定して取得できるか', async () => {
                const res = await dao.find({
                    where: {
                        id: dummyRes[0].ID,
                    },
                });
                expect(res).toBeDefined();
                expect(res.data[0].id).toBe(dummyRes[0].ID);
            });
            it('buildEntityでエラーが発生するか', () => {
                expect.assertions(3);
                const wrongParam: any = {
                    id: undefined,
                    crmShopId: undefined,
                    crmShopName: undefined,
                    crmCompanyId: undefined,
                };
                try {
                    ClinicsDAO['buildEntity'](new ClinicEntity(wrongParam));
                } catch (e) {
                    expect(e).toBeDefined();
                    expect(e.status).toBe(500);
                    expect(e).toBeInstanceOf(InternalServerErrorException);
                }
            });
        });

        describe('findClinicId', () => {
            it('取得できるか', async () => {
                const res = await dao.findClinicId({
                    crmShopId: '009',
                    crmCompanyId: '00009',
                });
                expect(res.id).toBeDefined();
            });
            it('NotFoundエラーが発生するか', async () => {
                expect.assertions(1);
                try {
                    await dao.findClinicId({
                        crmShopId: '989',
                        crmCompanyId: '98765',
                    });
                } catch (e) {
                    expect(e).toBeInstanceOf(NotFoundException);
                }
            });
        });

        afterEach(async () => {
            jest.resetAllMocks();
            await cleanupDummyClinics(manager);
            await DBConnection.close();
        });
    });
});
