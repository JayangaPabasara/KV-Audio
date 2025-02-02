import { isAdmin, isCustomer } from "../Validation/userValidations.js";
import Inquire from "../model/Inquire.js";

export async function addInquire(req, res) {
  try {
    if (isCustomer(req)) {
      const data = req.body;

      console.log(req.user);

      data.email = req.user.email;
      data.phone = req.user.phone;

      //generate the ids for inquiries
      let id = 0;

      const inquiries = await Inquire.find().sort({ id: -1 }).limit(1); //sort({colomn name : decending(-1) or assending(1) order}).limit(how much rows you needed)

      if (inquiries.length == 0) {
        id = 1;
      } else {
        id = inquiries[0].id + 1;
      }

      //save inquires into database
      data.id = id;

      const response = await Inquire(data).save();

      res.json({
        massage: "Inquire added successfull.",
        id: response.id,
      });
    }
  } catch (e) {
    res.status(500).json({
      massage: "Inquiry added failed.",
      error: e,
    });
  }
}

export async function getInquires(req, res) {
  try {
    if (isAdmin(req)) {
      const inquires = await Inquire.find();
      return res.json({ inquires });
    } else if (isCustomer(req)) {
      const email = req.user.email;
      const inquires = await Inquire.find({ email: email });
      return res.json({ inquires });
    } else {
      return res.status(403).json({
        message: "You are not authorized to perform this action.",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Inquiry fetch failed.",
      error: e.message,
    });
  }
}

export async function deleteInquire(req, res) {
  if (!req.user) {
    return res.json({
      message: "Please login and try again",
    });
  }
  const id = req.params.id;
  try {
    if (isAdmin(req)) {
      await Inquire.deleteOne({ id: id });
      return res.json({
        message: "Inquire deleted successfull.",
      });
    } else if (isCustomer(req)) {
      const inquires = await Inquire.findOne({ id: id });
      if (!inquires) {
        return res.json({
          message: "Inquire not found",
        });
      } else {
        if (inquires.email == req.user.email) {
          await Inquire.deleteOne({ id: id });
          return res.json({
            message: "Inquire deleted successfully.",
          });
        } else {
          return res.json({
            message: "You have not autharized to performe this action",
          });
        }
      }
    }
  } catch (e) {
    return res.status(500).json({
      message: "Inquire deleted fail.",
      error: e.message,
    });
  }
}

export async function updateInquire(req, res) {
  if (req.user == null) {
    return res.json({
      message: "Please log in and try again",
    });
  }
  try {
    if (isAdmin(req)) {
      const id = req.params.id;
      const data = req.body;

      await Inquire.updateOne({ id: id }, data);
      res.json({
        message: "Inquir updated successfully",
      });
    } else if (isCustomer(req)) {
      const id = req.params.id;
      const data = req.body;

      const inquiry = await Inquire.findOne({ id: id });
      if (inquiry == null) {
        return res.status(404).json({
          message: "Inquire is not found",
        });
      } else {
        if (inquiry.email == req.user.email) {
          await Inquire.updateOne({ id: id }, { message: data.message });
          return res.json({
            message: "Inquire updated successfully",
          });
        } else {
          return res.status(403).json({
            message: "You are not authorized to perform this action",
          });
        }
      }
    } else {
      res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Failed to update inquire",
    });
  }
}
