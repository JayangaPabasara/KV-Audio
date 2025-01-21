import Review from "../model/Review.js";

export function addReview(req, res) {
  if (req.user == null) {
    res.json({
      massage: "Please log in and try again...",
    });
    return;
  }

  const data = req.body;

  data.name = req.user.firstName + " " + req.user.lastName;
  data.email = req.user.email;
  data.profilePicuture = req.user.profilePicuture;

  const newReview = new Review(data);

  newReview
    .save()
    .then(() => {
      res.status(201).json({
        massage: "Review Save Successfull...!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        massage: "Review Saved fail...!",
      });
    });
}

export function getReview(req, res) {
  const user = req.user;

  if (user == null || user.role != "admin") {
    Review.find({ isApproved: true }).then((reviews) => {
      res.json(reviews);
    });
    return;
  }

  if (user.role == "admin") {
    Review.find().then((reviews) => {
      res.json(reviews);
    });
  }
}

export function deleteReview(req, res) {
  const email = req.params.email;

  if (req.user == null) {
    res.json({
      massage: "Login and try again later",
    });
    return;
  }

  if (req.user.role == "admin") {
    Review.deleteOne({ email: email })
      .then(() => {
        res.json({
          massage: "Review is deleted successfull.",
        });
      })
      .catch((err) => {
        res.json({
          error: "Review is deleted fail." + err,
        });
      });
    return;
  }

  if (req.user.role == "customer") {
    if (req.user.email == email) {
      Review.deleteOne({ email: email })
        .then(() => {
          res.json({
            massage: "Review deleted successfull. ",
          });
        })
        .catch((err) => {
          res.json({
            error: "Review deleted fail." + err,
          });
        });
    }
  } else {
    res.json({
      massage: "You have not autharize to performe this operation",
    });
  }
}

export function approveReview(req, res) {
  const email = req.params.email;

  if (req.user == null) {
    res.json({
      massage: "Login again and plz try again",
    });
    return;
  }

  if (req.user.role == "admin") {
    Review.updateOne(
      {
        email: email,
      },
      {
        isApproved: true,
      }
    )
      .then(() => {
        res.json({
          massage: "Review updated successfull.",
        });
      })
      .catch((err) => {
        res.json({
          error: "Review updated fail." + err,
        });
      });
  } else {
    res.json({
      massage: "You have not authorized to performe this action",
    });
  }
}
