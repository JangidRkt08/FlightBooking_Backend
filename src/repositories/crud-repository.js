const { Logger } = require("../config");

class Crudrepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
      const response = await this.model.create(data);
      return response;
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: { id: data },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wring in the CRUD repository : destroy");
      throw error;
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      return response;
    } catch (error) {
      Logger.error("Something went wring in the CRUD repository : get");
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("Something went writing in the CRUD repository : getAll");
      throw error;
    }
  }

  async update(id, data) {
  
  }
}

module.exports = Crudrepository;