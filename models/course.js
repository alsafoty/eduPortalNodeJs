const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descreption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    attendance: {
      type: Object,
      required: false,
    },
    teacher: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
