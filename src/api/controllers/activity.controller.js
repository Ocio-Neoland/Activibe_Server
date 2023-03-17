const Activity = require("../models/activity.model");
const { deleteImgCloudinary } = require("../middlewares/img.middleware");
const User = require("../models/user.model");
const Section = require("../models/section.model");

const getAllActivities = async (req, res, next) => {
  try {
    const Activities = await Activity.find().populate(
      "createdBy comments feeds favorites"
    );
    let media;

    for (const activity of Activities) {
      activity.mediaStars = 0;
      for (const feed of activity.feeds) {
        activity.mediaStars += feed.stars;
        media = activity.mediaStars / activity.feeds.length;
      }
      activity.mediaStars = media;
    }

    // let total = 0;
    // let mediaStars;

    // if (mapedActivities.length) {
    //   for (let index = 0; index < mapedActivities.length; index++) {
    //     total += mapedActivities[index].feed;
    //     mediaStars = total / mapedActivities.length;
    //     // mediaStars = await Activity.findByIdAndUpdate(
    //     //   req.body.idActivity,
    //     //   activityForID
    //     // );
    //   }
    //   console.log(mediaStars);
    // }

    // if (Acti.feeds.length) {
    //   const allfeeds = await activityForID.feeds.map((feed) => ({
    //     feed: feed.stars,
    //   }));

    //   for (let index = 0; index < allfeeds.length; index++) {
    //     total += allfeeds[index].feed;
    //   }
    //   activityForID.mediaStars = total / allfeeds.length;
    //   mediaStars = await Activity.findByIdAndUpdate(
    //     req.body.idActivity,
    //     activityForID
    //   );
    // }
    res.status(200).json(Activities);
  } catch (error) {
    return next(error);
  }
};

// const activityForID = await Activity.findById(req.body.idActivity).populate(
//   "feeds"
// );
// let total = 0;
// let mediaStars;
// if (findActivity.feeds.length) {
//   const allfeeds = await activityForID.feeds.map((feed) => ({
//     feed: feed.stars,
//   }));

//   for (let index = 0; index < allfeeds.length; index++) {
//     total += allfeeds[index].feed;
//   }
//   activityForID.mediaStars = total / allfeeds.length;
//   mediaStars = await Activity.findByIdAndUpdate(
//     req.body.idActivity,
//     activityForID
//   );
// }
const getActivityByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id)
      .populate("comments feeds createdBy favorites")
      .populate({
        path: "feeds",
        populate: "idUser idActivity",
      })
      .populate({
        path: "comments",
        populate: "idUser idActivity",
      });
    console.log(activity);
    activity.mediaStars = 0;
    let media;
    for (const feed of activity.feeds) {
      activity.mediaStars += feed.stars;
      media = activity.mediaStars / activity.feeds.length;
    }
    activity.mediaStars = media;
    // console.log(media);
    // const activityUpdate = await Activity.findByIdAndUpdate(
    //   id,
    //   activity
    // ).populate("feeds");
    return res.status(200).json(activity);
  } catch (error) {
    return next(error);
  }
};

const createActivities = async (req, res, next) => {
  try {
    const newActivity = new Activity({
      ...req.body,
      image: req.file
        ? req.file.path
        : "https://res.cloudinary.com/dy4mossqz/image/upload/v1678118078/utils/Placeholder_view_vector.svg_z87jyu.png",
    });
    const findUser = await User.findById(req.body.createdBy).populate(
      "comments feeds favorites"
    );
    const findSection = await Section.findOne({
      name: newActivity.type,
    }).populate("activities");
    findUser.createdActivities.push(newActivity._id);

    findSection.activities.push(newActivity._id);
    const updateUser = await User.findByIdAndUpdate(
      req.body.createdBy,
      findUser
    ).populate("createdActivities");
    const updateSection = await Section.findByIdAndUpdate(
      findSection._id,
      findSection
    ).populate("activities");
    const createdActivity = await newActivity.save();
    return res.status(201).json({ createdActivity, updateUser, updateSection });
  } catch (error) {
    return next(error);
  }
};

const chooseFavorite = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      "comments feeds createdBy favorites"
    );
    const user = await User.findById(req.body.userId).populate("favorites");
    if (!activity.favorites.includes(req.body.userId)) {
      await activity.updateOne({ $push: { favorites: req.body.userId } });
      await user.updateOne({ $push: { favorites: req.params.id } });
      res.status(200).json("The activity has been liked");
    } else {
      await activity.updateOne({ $pull: { favorites: req.body.userId } });
      await user.updateOne({ $pull: { favorites: req.params.id } });
      res.status(200).json("The activity has been disliked");
    }
  } catch (error) {
    return next(error);
  }
};

const updateActivities = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newActivity = new Activity(req.body);
    newActivity._id = id;
    const originalActivity = await Activity.findById(id).populate(
      "comments feeds createdBy favorites"
    );
    if (req.file) {
      deleteImgCloudinary(originalActivity.image);
      newActivity.image = req.file.path;
    }
    await Activity.findByIdAndUpdate(id, newActivity).populate(
      "comments feeds createdBy favorites"
    );
    return res.status(200).json(newActivity);
  } catch (error) {
    return next(error);
  }
};

const deleteActivities = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteActivities = await Activity.findByIdAndDelete(id).populate(
      "comments feeds createdBy favorites"
    );
    if (deleteActivities.image) {
      deleteImgCloudinary(deleteActivities.image);
      return res.status(200).json(deleteActivities);
    }
  } catch (error) {
    return next(error);
  }
};

const getRankingTop10 = async (req, res, next) => {
  try {
    const Activities = await Activity.find().populate(
      "comments feeds createdBy favorites"
    );
    let media;

    for (const activity of Activities) {
      activity.mediaStars = 0;
      if (!activity.feeds.length) {
        media = 0;
      } else {
        for (const feed of activity.feeds) {
          activity.mediaStars += feed.stars;
          media = activity.mediaStars / activity.feeds.length;
        }
      }
      activity.mediaStars = media;
    }

    Activities.sort(function (x, y) {
      // ordenar primero por el campo 'name'
      if (y.mediaStars < x.mediaStars) {
        return -1;
      }

      if (y.mediaStars > x.mediaStars) {
        return 1;
      }

      // si los nombres son iguales, ordenar por 'year'
      return y.mediaStars - x.mediaStars;
    });

    const ordenadas = Activities;
    const finalOrdenadas = ordenadas.slice(0, 10);

    console.log(finalOrdenadas);

    // let top10 = [];
    // for (let index = 0; index < 10; index++) {
    //   top10.push(Activities[index]);
    // }

    // for (let index = 0; index < 10; index++) {
    //   Activities[index].sort();
    // }
    // console.log(Activities);
    res.status(200).json(finalOrdenadas);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllActivities,
  getActivityByID,
  createActivities,
  updateActivities,
  deleteActivities,
  chooseFavorite,
  getRankingTop10,
};
