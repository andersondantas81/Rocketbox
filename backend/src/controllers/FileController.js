import File from "../models/File";
import Box from "../models/Box";

class FileController {
  async store(req, res) {
    const box = await Box.findById(req.params.id);

    const file = await File.create({
      title: req.file.oridinalname,
      path: req.file.key
    });

    box.files.push(file);

    await box.save();

    req.io.sockets.in(box._id).emit("file", file);

    return res.json(file);
  }
}

module.exports = new FileController();
