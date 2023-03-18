const Section = require("../models/section.model");
const Activity = require("../models/activity.model");
//  getAll, CRUD

const getAllSections = async (req, res, next) => {
  try {
    const sections = await Section.find().populate("activities").populate({
      path: "activities",
      populate: "feeds comments favorites",
    });

    res.status(200).json(sections);
  } catch (error) {
    return next(error);
  }
};

const getSectionByName = async (req, res, next) => {
  try {
    // const section = await Section.findOne({ name: req.params.name })
    //   .populate("activities")
    //   .populate({
    //     path: "activities",
    //     populate: "feeds comments favorites",
    //   });
    // const findActivities = await Activity.find({
    //   type: req.params.name,
    // }).populate("feeds");
    // let media;

    // for (const activity of findActivities) {
    //   activity.mediaStars = 0;
    //   if (!activity.feeds.length) {
    //     media = 0;
    //   } else {
    //     for (const feed of activity.feeds) {
    //       activity.mediaStars += feed.stars;
    //       media = activity.mediaStars / activity.feeds.length;
    //     }
    //   }
    //   activity.mediaStars = media;
    // }

    if (req.query.page && !isNaN(parseInt(req.query.page))) {
      const numActivity = await Activity.find({
        type: req.params.name,
      }).countDocuments();

      let page = parseInt(req.query.page);

      let limit = req.query.limit ? parseInt(req.query.limit) : 10;

      let numPages =
        numActivity % limit > 0 ? numActivity / limit + 1 : numActivity / limit;

      if (page > numPages || page < 1) {
        page = 1;
      }

      const skip = (page - 1) * limit;

      const allActivities = await Activity.find({ type: req.params.name })
        .skip(skip)
        .limit(limit)
        .populate("feeds comments createdBy favorites")
        .populate({
          path: "feeds",
          populate: "idUser idActivity",
        })
        .populate({
          path: "comments",
          populate: "idUser idActivity",
        })
        .populate({
          path: "createdBy",
          populate: "createdActivities comments feeds favorites",
        });
      let media;

      for (const activity of allActivities) {
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
      return res.status(200).json({
        info: {
          total: numActivity,
          page: page,
          limit: limit,
          next:
            numPages >= page + 1
              ? `/api/v1/sections/${req.params.name}?page=${
                  page + 1
                }&limit=${limit}`
              : null,
          prev:
            page != 1
              ? `/api/v1/sections/${req.params.name}?page=${
                  page - 1
                }&limit=${limit}`
              : null,
        },
        results: allActivities,
      });
    } else {
      const allActivities = await Activity.find({
        type: req.params.name,
      })
        .limit(10)
        .populate("feeds comments createdBy favorites")
        .populate({
          path: "feeds",
          populate: "idUser idActivity",
        })
        .populate({
          path: "comments",
          populate: "idUser idActivity",
        })
        .populate({
          path: "createdBy",
          populate: "createdActivities comments feeds favorites",
        });
      let media;

      for (const activity of allActivities) {
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
      const numActivity = await Activity.find({
        type: req.params.name,
      }).countDocuments();

      return res.status(200).json({
        info: {
          total: numActivity,
          page: 1,
          limit: 10,
          next:
            numActivity > 10
              ? `/api/v1/sections/${req.params.name}?page=2&limit=10`
              : null,
          prev: null,
        },
        results: allActivities,
      });
    }
  } catch (error) {
    return next(error);
  }
};

const createSections = async (req, res, next) => {
  try {
    const newSection = new Section(req.body);
    const createdSection = await newSection.save();
    return res.status(201).json(createdSection);
  } catch (error) {
    return next(error);
  }
};

const updateSections = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSection = await Section.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedSection);
  } catch (error) {
    return next(error);
  }
};

const deleteSections = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteSections = await Section.findByIdAndDelete(id);
    res.status(200).json(deleteSections);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllSections,
  getSectionByName,
  createSections,
  updateSections,
  deleteSections,
};
