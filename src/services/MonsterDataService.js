import http from "../http-common";
class MonsterDataService {
    getAll() {
        return http.get("/monsters");
    }
    get(id) {
        return http.get(`/monsters/${id}`);
    }
    create(data) {
        return http.post("/monsters", data);
    }
    update(id, data) {
        return http.put(`/monsters/${id}`, data);
    }
    delete(id) {
        return http.delete(`/monsters/${id}`);
    }
    deleteAll() {
        return http.delete(`/monsters`);
    }
    findByName(name) {
        return http.get(`/monsters?title=${name}`);
    }
}
export default new MonsterDataService();