import res from "express/lib/response";

let injectResponse = () => {
  res.sendByForm = function(code, description, data) {
    this.status(code).send({
      code: code,
      description: description,
      data: data
    });
  };
};

module.exports = injectResponse;
