const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User");
const AdminInstruction = require("../models/Instruction");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Query = require("../models/Query");
const InvoiceHistory = require("../models/InvoiceHistory");
const Invoice = require("../models/Invoice");
const CompanyDetail = require("../models/Company");
const Company = require("../models/Company");

router.post("/addCategory", isLoggedIn, async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    let inst = await AdminInstruction.find();
    if (user.isVerifiedBySuperAdmin) {
      if (inst.length == 0) {
        let cat = [];
        let category = { name: req.body.category };
        cat.push(category);
        inst = await new AdminInstruction({
          category: cat,
          noOfActive: { categoryActive: 1 },
        });

        inst.save();
      } else {
        let x = inst[0].category;
        let ok = true;
        for (let i = 0; i < x.length; i++) {
          if (x[i].name.toLowerCase() === req.body.category.toLowerCase()) {
            ok = false;
          }
        }
        if (ok) {
          inst[0].category.push({ name: req.body.category });
          inst[0].noOfActive.categoryActive++;
          inst[0].save();
        } else {
          return res.send({
            success: true,
            data: user,
            message: "Category already exist",
          });
        }
      }
      console.log("Category Added");
      return res.send({
        success: true,
        data: user,
        message: "Category sucessfully added",
      });
    } else {
      console.log("Category Not added as user is not admin");
      return res.send({
        success: false,
        message: "Oops!!! Only admin can add",
      });
    }
  } catch (err) {
    console.log("error in admin.js in /addCategory", err);
    return res.send({
      success: false,
      message: "Some internal Error can't be added",
    });
  }
});

router.post("/addCountry", isLoggedIn, async function (req, res) {
  try {
    console.log("req.body", req.body);
    const user = await User.findById(req.user.id);
    let inst = await AdminInstruction.find();

    if (user.isVerifiedBySuperAdmin) {
      if (inst.length == 0) {
        inst = await new AdminInstruction({
          place: {
            country: { name: req.body.country },
          },
          noOfActive: { countryActive: 1 },
        });
        inst.save();
      } else {
        let x = await inst[0].place;
        let ok = true;
        for (let i = 0; i < x.length; i++) {
          if (
            x[i].country.name.toLowerCase() === req.body.country.toLowerCase()
          ) {
            ok = false;
            break;
          }
        }
        if (ok) {
          inst[0].place.push({ country: { name: req.body.country } });
          inst[0].noOfActive.countryActive++;
          inst[0].save();
        } else {
          return res.send({
            success: true,
            data: user,
            message: "Country already exist",
          });
        }
      }
      console.log("Country Added");
      return res.send({
        success: true,
        data: user,
        message: "Country sucessfully added",
      });
    } else {
      console.log("Country Not added as user is not admin");
      return res.send({
        success: false,
        message: "Oops!!! Only admin can add",
      });
    }
  } catch (err) {
    console.log("error in admin.js in /addCountry", err);
    return res.send({
      success: false,
      message: "Some internal Error can't be added",
    });
  }
});

router.post("/addCity", isLoggedIn, async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    let inst = await AdminInstruction.find();

    if (user.isVerifiedBySuperAdmin) {
      let x = await inst[0].place;

      for (let i = 0; i < x.length; i++) {
        if (x[i].country.name === req.body.country) {
          let city = x[i].city;
          let ok = true;
          for (let j = 0; j < city.length; j++) {
            if (city[j].name.toLowerCase() === req.body.city.toLowerCase()) {
              ok = false;
              break;
            }
          }
          if (ok) {
            x[i].city.push({ name: req.body.city });
            inst[0].noOfActive.cityActive++;
            inst[0].save();
            console.log("City Added");
            return res.send({
              success: true,
              data: user,
              message: "City sucessfully added",
            });
          } else {
            return res.send({
              success: true,
              data: user,
              message: "City already exist",
            });
          }
        }
      }
    } else {
      return res.send({
        success: true,
        data: user,
        message: "Oops!!! Only admin can add",
      });
    }
  } catch (err) {
    console.log("error in admin.js in /addCity", err);
    return res.send({
      success: false,
      message: "Some internal Error can't be added",
    });
  }
});

router.post("/addMeal", isLoggedIn, async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    let inst = await AdminInstruction.find();

    if (user.isVerifiedBySuperAdmin) {
      if (inst.length === 0) {
        let m = [];
        m.push({ name: req.body.meal });
        inst = await new AdminInstruction({
          meal: m,
          noOfActive: { mealActive: 1 },
        });
        inst.save();
      } else {
        let meal = inst[0].meal;
        let ok = true;
        for (let i = 0; i < meal.length; i++) {
          if (meal[i].name.toLowerCase() === req.body.meal.toLowerCase()) {
            ok = false;
            break;
          }
        }
        if (ok) {
          meal.push({ name: req.body.meal });
          inst[0].noOfActive.mealActive++;
          inst[0].save();
        } else {
          return res.send({
            success: true,
            data: user,
            message: "Meal Plan already exist",
          });
        }
      }
      console.log("Meal Added");
      return res.send({
        success: true,
        data: user,
        message: "Meal Plan sucessfully added",
      });
    } else {
      return res.send({
        success: false,
        message: "Oops!!! Only admin can add",
      });
    }
  } catch (err) {
    console.log("error in admin.js in /addMeal", err);
    return res.send({
      success: false,
      message: "Some internal Error can't be added",
    });
  }
});

router.post("/addTransport", isLoggedIn, async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    let inst = await AdminInstruction.find();

    if (user.isVerifiedBySuperAdmin) {
      if (inst.length == 0) {
        let c = [];
        c.push({ name: req.body.mode });
        inst = await new AdminInstruction({
          mode: c,
          noOfActive: { modeActive: 1 },
        });
        inst.save();
      } else {
        let x = inst[0].mode;
        let ok = true;
        for (let i = 0; i < x.length; i++) {
          if (x[i].name.toLowerCase() === req.body.mode.toLowerCase()) {
            ok = false;
          }
        }
        if (ok) {
          inst[0].mode.push({ name: req.body.mode });
          inst[0].noOfActive.modeActive++;
          inst[0].save();
        } else {
          return res.send({
            success: true,
            data: user,
            message: "Transport already exist",
          });
        }
      }
      console.log("Transport Added");

      return res.send({
        success: true,
        data: user,
        message: "Transport sucessfully added",
      });
    } else {
      return res.send({
        success: false,
        message: "Oops!!! Only admin can add",
      });
    }
  } catch (err) {
    console.log("error in admin.js in /addTransport", err);
    return res.send({
      success: false,
      message: "Some internal Error can't be added",
    });
  }
});

router.post("/addStation", isLoggedIn, async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    let inst = await AdminInstruction.find();

    if (user.isVerifiedBySuperAdmin) {
      let trans = inst[0].transport;
      let found = false;
      for (let i = 0; i < trans.length; i++) {
        if (
          trans[i].mode.toLowerCase() == req.body.mode.toLowerCase() &&
          trans[i].city.toLowerCase() == req.body.city.toLowerCase() &&
          trans[i].country.toLowerCase() == req.body.country.toLowerCase()
        ) {
          let station = trans[i].station;
          let ok = true;
          console.log("station", station);
          for (let j = 0; j < station.length; j++) {
            console.log("station[j]", station[j]);
            if (
              req.body.station.toLowerCase() == station[j].name.toLowerCase()
            ) {
              ok = false;
              break;
            }
          }
          if (ok) {
            station.push({ name: req.body.station });
            inst[0].noOfActive.stationActive++;
            inst[0].save();
          } else {
            return res.send({
              success: true,
              data: user,
              message: "Transport already exist",
            });
          }
          found = true;
        }
      }
      if (!found) {
        let c = [];
        c.push(req.body.station);
        trans.push({
          mode: req.body.mode,
          city: req.body.city,
          country: req.body.country,
          station: { name: req.body.station },
        });
        inst[0].noOfActive.stationActive++;
        inst[0].save();
      }
      console.log("Station Added");
      return res.send({
        success: true,
        data: user,
        message: "Station sucessfully added",
      });
    } else {
      return res.send({
        success: false,
        message: "Oops!!! Only admin can add",
      });
    }
  } catch (err) {
    console.log("error in admin.js in /addStation", err);
  }
});

router.post("/activeDeactive", isLoggedIn, async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    let inst = await AdminInstruction.find();
    let x;
    let msg;
    if (user.isVerifiedBySuperAdmin) {
      if (req.body.comp == "category") {
        if (req.body.obj.active == true) {
          inst[0].noOfActive.categoryActive--;
          msg = "Deactive";
        } else {
          inst[0].noOfActive.categoryActive++;
          msg = "active";
        }
        await AdminInstruction.updateOne(
          { "category._id": req.body.obj._id },
          { $set: { "category.$.active": !req.body.obj.active } }
        );
        inst[0].save();
        return res.send({
          success: true,
          data: user,
          message: `${msg} sucessfully `,
        });
      } else if (req.body.comp == "city") {
        x = inst[0].place;
        for (let i = 0; i < x.length; i++) {
          let y = x[i].city;
          for (let j = 0; j < y.length; j++) {
            console.log(y[j].id, req.body.obj._id);
            if (y[j].id == req.body.obj._id) {
              if (y[j].active == true) {
                y[j].active = false;
                inst[0].noOfActive.cityActive--;
                msg = "Deactive";
              } else {
                y[j].active = true;
                inst[0].noOfActive.cityActive++;
                msg = "active";
              }
              inst[0].save();
              return res.send({
                success: true,
                data: user,
                message: `${msg} sucessfully `,
              });
            }
          }
        }
      } else if (req.body.comp == "country") {
        x = inst[0].place;
        console.log(req.body);
        for (let i = 0; i < x.length; i++) {
          if (x[i].country.id == req.body.obj.id) {
            if (x[i].country.active == true) {
              x[i].country.active = false;
              inst[0].noOfActive.countryActive--;
              msg = "Deactive";
            } else {
              x[i].country.active = true;
              inst[0].noOfActive.countryActive++;
              msg = "active";
            }
            inst[0].save();
            return res.send({
              success: true,
              data: user,
              message: `${msg} sucessfully `,
            });
          }
        }
      } else if (req.body.comp == "station") {
        x = inst[0].transport;
        for (let i = 0; i < x.length; i++) {
          let y = x[i].station;
          for (let j = 0; j < y.length; j++) {
            if (y[j].id == req.body.obj._id) {
              if (y[j].active == true) {
                y[j].active = false;
                inst[0].noOfActive.stationActive--;
                msg = "Deactive";
              } else {
                y[j].active = true;
                inst[0].noOfActive.stationActive++;
                msg = "active";
              }
              inst[0].save();
              return res.send({
                success: true,
                data: user,
                message: `${msg} sucessfully `,
              });
            }
          }
        }
      } else if (req.body.comp == "transport") {
        x = inst[0].mode;
        for (let i = 0; i < x.length; i++) {
          if (x[i]._id == req.body.obj._id) {
            if (x[i].active == true) {
              x[i].active = false;
              inst[0].noOfActive.modeActive--;
              msg = "Deactive";
            } else {
              x[i].active = true;
              inst[0].noOfActive.modeActive++;
              msg = "active";
            }
            inst[0].save();
            return res.send({
              success: true,
              data: user,
              message: `${msg} sucessfully `,
            });
          }
        }
      } else if (req.body.comp == "Meal Plan") {
        x = inst[0].meal;
        for (let i = 0; i < x.length; i++) {
          if (x[i]._id == req.body.obj._id) {
            if (x[i].active == true) {
              x[i].active = false;
              inst[0].noOfActive.mealActive--;
              msg = "Deactive";
            } else {
              x[i].active = true;
              inst[0].noOfActive.mealActive++;
              msg = "active";
            }
            inst[0].save();
            return res.send({
              success: true,
              data: user,
              message: `${msg} sucessfully `,
            });
          }
        }
      }
      return res.send({
        success: false,
        message: "Some internal error can't saved data",
      });
    } else {
      return res.send({
        success: false,
        message: "Oops!!! Only admin can add",
      });
    }
  } catch (err) {
    console.log("error in admin.js in /activeDeactive", err);
  }
});

router.post("/delete", isLoggedIn, async function (req, res) {
  try {
    console.log("inside delete");
    const user = await User.findById(req.user.id);
    let inst = await AdminInstruction.find();
    if (user.isVerifiedBySuperAdmin) {
      if (req.body.comp == "category") {
        cat = inst[0].category;
        let index;
        for (let i = 0; i < cat.length; i++) {
          if (cat[i]._id == req.body.obj._id) {
            index = i;
            break;
          }
        }
        if (cat[index].active == true) {
          inst[0].noOfActive.categoryActive--;
        }
        cat.splice(index, 1);
        inst[0].save();
        return res.send({
          success: true,
          message: "Deleted Sucessfully",
        });
      } else if (req.body.comp == "transport") {
        mode = inst[0].mode;
        let index;
        for (let i = 0; i < mode.length; i++) {
          if (mode[i]._id == req.body.obj._id) {
            index = i;
            break;
          }
        }
        if (mode[index].active == true) {
          inst[0].noOfActive.modeActive--;
        }
        mode.splice(index, 1);
        inst[0].save();
        return res.send({
          success: true,
          message: "Deleted Sucessfully",
        });
      } else if (req.body.comp == "Meal Plan") {
        meal = inst[0].meal;
        let index;
        for (let i = 0; i < meal.length; i++) {
          if (meal[i]._id == req.body.obj._id) {
            index = i;
            break;
          }
        }
        if (meal[index].active == true) {
          inst[0].noOfActive.mealActive--;
        }
        meal.splice(index, 1);
        inst[0].save();
        return res.send({
          success: true,
          message: "Deleted Sucessfully",
        });
      } else if (req.body.comp == "country") {
        c = inst[0].place;
        let index;
        for (let i = 0; i < c.length; i++) {
          if (c[i].country._id == req.body.obj._id) {
            index = i;
            break;
          }
        }
        console.log(c[index].city);
        if (c[index].country.active == true) {
          inst[0].noOfActive.countryActive--;
        }
        let city = c[index].city;
        for (let i = 0; i < city.length; i++) {
          if (city[i].active) {
            inst[0].noOfActive.cityActive--;
          }
        }
        c.splice(index, 1);
        inst[0].save();
        return res.send({
          success: true,
          message: "Deleted Sucessfully",
        });
      } else if (req.body.comp == "city") {
        c = inst[0].place;
        let index = -1;
        for (let i = 0; i < c.length; i++) {
          let city = c[i].city;
          for (let j = 0; j < city.length; j++) {
            if (city[j]._id == req.body.obj._id) {
              index = j;
              break;
            }
          }
          if (index != -1) {
            if (city[index].active == true) {
              inst[0].noOfActive.cityActive--;
            }
            city.splice(index, 1);
            inst[0].save();
            break;
          }
        }
        return res.send({
          success: true,
          message: "Deleted Sucessfully",
        });
      } else if (req.body.comp == "station") {
        c = inst[0].transport;
        let index = -1;
        for (let i = 0; i < c.length; i++) {
          let s = c[i].station;
          for (let j = 0; j < s.length; j++) {
            if (s[j].id == req.body.obj._id) {
              index = j;
              break;
            }
          }
          if (index != -1) {
            if (s[index].active == true) {
              inst[0].noOfActive.stationActive--;
            }
            s.splice(index, 1);
            inst[0].save();
            break;
          }
        }
        return res.send({
          success: true,
          message: "Deleted Sucessfully",
        });
      }
    } else {
      return res.send({
        success: false,
        message: "Oops!!! Only admin can add",
      });
    }
  } catch (err) {
    console.log("error in admin.js in /delete", err);
  }
});

router.post("/edit", isLoggedIn, async (req, res) => {
  try {
    console.log("inside edit");
    const user = await User.findById(req.user.id);
    let inst = await AdminInstruction.find();
    if (user.isVerifiedBySuperAdmin) {
      if (req.body.comp == "category") {
        let c = inst[0].category;
        for (let i = 0; i < c.length; i++) {
          if (c[i]._id == req.body.obj._id) {
            c[i].name = req.body.obj.name;
            inst[0].save();
            return res.send({
              success: true,
              message: "Updated",
            });
          }
        }
      } else if (req.body.comp == "transport") {
        mode = inst[0].mode;
        let oldname;
        for (let i = 0; i < mode.length; i++) {
          if (mode[i]._id == req.body.obj._id) {
            oldname = mode[i].name;
            mode[i].name = req.body.obj.name;
            break;
          }
        }
        c = inst[0].transport;
        for (let i = 0; i < c.length; i++) {
          if (c[i].mode == oldname) {
            c[i].mode = req.body.obj.name;
          }
        }
        inst[0].save();
        return res.send({
          success: true,
          message: "Updated",
        });
      } else if (req.body.comp == "Meal Plan") {
        meal = inst[0].meal;
        for (let i = 0; i < meal.length; i++) {
          if (meal[i]._id == req.body.obj._id) {
            meal[i].name = req.body.obj.name;
            inst[0].save();
            return res.send({
              success: true,
              message: "Updated",
            });
          }
        }
      } else if (req.body.comp == "country") {
        c = inst[0].place;
        console.log(c);
        for (let i = 0; i < c.length; i++) {
          if (c[i].country.id == req.body.obj.id) {
            c[i].country.name = req.body.obj.name;
            inst[0].save();
            return res.send({
              success: true,
              message: "Updated",
            });
          }
        }
      } else if (req.body.comp == "city") {
        c = inst[0].place;
        for (let i = 0; i < c.length; i++) {
          let city = c[i].city;
          for (let j = 0; j < city.length; j++) {
            if (city[j]._id == req.body.obj._id) {
              city[j].name = req.body.obj.name;
              inst[0].save();
              return res.send({
                success: true,
                message: "Updated",
              });
            }
          }
        }
      } else if (req.body.comp == "station") {
        c = inst[0].transport;
        for (let i = 0; i < c.length; i++) {
          let s = c[i].station;
          for (let j = 0; j < s.length; j++) {
            if (s[j].id == req.body.obj._id) {
              s[j].name = req.body.obj.name;
              inst[0].save();
              return res.send({
                success: true,
                message: "Updated",
              });
            }
          }
        }
      }
      return res.send({
        success: true,
        message: "Some internal error can't be updated",
      });
    } else {
      return res.send({
        success: false,
        message: "Oops!!! Only admin can add",
      });
    }
  } catch (err) {
    console.log("error in admin.js in /edit", err);
  }
});

router.get("/destinataionData", async function (req, res) {
  try {
    let inst = await AdminInstruction.find();
    return res.send({ success: true, data: inst });
  } catch (err) {
    console.log("error in admin.js in /destinataionData", err);
  }
});

router.get("/getVendor", async (req, res) => {
  try {
    let user = await User.find();
    let ans = [];
    for (let i = 0; i < user.length; i++) {
      if (user[i].role == "supplier") {
        ans.push(user[i]);
      }
    }
    return res.send({ success: true, data: ans });
  } catch (err) {
    console.log("error in admin.js in /vendor", err);
  }
});

router.get("/getClient", async (req, res) => {
  try {
    let user = await User.find();
    let ans = [];
    for (let i = 0; i < user.length; i++) {
      if (user[i].role == "client") {
        ans.push(user[i]);
      }
    }
    return res.send({ success: true, data: ans });
  } catch (err) {
    console.log("error in admin.js in /vendor", err);
  }
});

router.post("/user/delete", async (req, res) => {
  try {
    const { user, comp, name, group } = req.body;
    if (comp == "account") {
      let user1 = await User.findById(user);
      let document = user1.document;
      console.log(document);
      if (document) {
        if (document.logo) {
          if (
            document.logo &&
            fs.existsSync(path.join(__dirname, "..", document.logo))
          ) {
            fs.unlinkSync(path.join(__dirname, "..", document.logo));
          }
        }

        if (document.gstCertificate) {
          if (
            document.gstCertificate &&
            fs.existsSync(path.join(__dirname, "..", document.gstCertificate))
          ) {
            fs.unlinkSync(path.join(__dirname, "..", document.gstCertificate));
          }
        }
        if (document.panCard) {
          if (
            document.panCard &&
            fs.existsSync(path.join(__dirname, "..", document.panCard))
          ) {
            fs.unlinkSync(path.join(__dirname, "..", document.panCard));
          }
        }

        if (document.shopFrontView) {
          if (
            document.shopFrontView &&
            fs.existsSync(path.join(__dirname, "..", document.shopFrontView))
          ) {
            fs.unlinkSync(path.join(__dirname, "..", document.shopFrontView));
          }
        }

        if (document.contactPersonDetails) {
          if (
            document.contactPersonDetails &&
            fs.existsSync(
              path.join(__dirname, "..", document.contactPersonDetails)
            )
          ) {
            fs.unlinkSync(
              path.join(__dirname, "..", document.contactPersonDetails)
            );
          }
        }
      }
      user1.remove();
      return res.send({ success: true, message: "Deleted successfully" });
    } else if (comp == "group") {
      const inst = await AdminInstruction.find();
      let grp;
      if (name == "Vender") {
        grp = inst[0].venderGroup;
      } else {
        grp = inst[0].customerGroup;
      }
      let index;
      for (let i = 0; i < grp.length; i++) {
        if (grp[i].name == group) {
          index = i;
          break;
        }
      }
      grp.splice(index, 1);
      inst[0].save();
      return res.send({ success: true, message: "Deleted Successfully" });
    }
  } catch (err) {
    console.log("error in admin.js in /vendor/delete", err);
  }
});

router.post("/approve", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.user, {
      isApproved: true,
    });

    return res.send({ success: true, message: "Approved Successfully" });
  } catch (err) {
    console.log("Error in vendor.js in /personalInfo", err);
  }
});

router.post("/user/activedeactive", async (req, res) => {
  const { user, comp, name, group } = req.body;
  if (comp == "account") {
    const user1 = await User.findById(user);
    let active = user1.isActive;
    if (active) {
      user1.isActive = false;
      user1.save();
      return res.send({ success: true, message: "Deactive Successfully" });
    } else {
      user1.isActive = true;
      user1.save();
      return res.send({ success: true, message: "Active Successfully" });
    }
  } else if (comp == "group") {
    const inst = await AdminInstruction.find();
    let grp;
    if (name == "Vender") {
      grp = inst[0].venderGroup;
    } else {
      grp = inst[0].customerGroup;
    }
    for (let i = 0; i < grp.length; i++) {
      if (grp[i].name == group) {
        if (grp[i].isActive) {
          grp[i].isActive = false;
          inst[0].save();
          return res.send({ success: true, message: "Deactive Successfully" });
        } else {
          grp[i].isActive = true;
          inst[0].save();
          return res.send({ success: true, message: "Active Successfully" });
        }
      }
    }
  }
});

router.post("/user/block", async (req, res) => {
  let instruct = await AdminInstruction.find();
  const user = await User.findById(req.body.user);
  let x;
  if (user.role == "supplier") {
    x = instruct[0].venderGroup;
  } else {
    x = instruct[0].customerGroup;
  }

  let block = user.isBlock;
  if (block) {
    let index = -1;
    for (let i = 0; i < x.length; i++) {
      if (x[i].name == "Block") {
        index = i;
        break;
      }
    }
    if (index != -1) {
      x.splice(index, 1);
      instruct[0].save();
    }
    user.isBlock = false;
    user.save();
    return res.send({ success: true, message: "Unblock Successfully" });
  } else {
    let ok = false;
    for (let i = 0; i < x.length; i++) {
      if (x[i].name == "Block") {
        ok = true;
        x[i].user.push(user._id);
        break;
      }
    }
    if (!ok) {
      x.push({ name: "Block", user: [user._id] });
      instruct[0].save();
    }
    user.isBlock = true;
    user.save();
    return res.send({ success: true, message: "Block Successfully" });
  }
});

router.get("/client", async (req, res) => {
  try {
    let user = await User.find();
    let ans = [];
    for (let i = 0; i < user.length; i++) {
      if (user[i].role == "client") {
        ans.push(user[i]);
      }
    }
    return res.send({ success: true, data: ans });
  } catch (err) {
    console.log("error in admin.js in /vendor", err);
  }
});

router.post("/upload/:country", async (req, res) => {
  try {
    const country = req.params.country;
    let instruct = await AdminInstruction.find();
    const place = instruct[0].place;
    let img;
    let index;
    for (let i = 0; i < place.length; i++) {
      if (place[i].country.name === country) {
        index = i;
        break;
      }
    }
    if (place[index].country.img) {
      img = place[index].country.img;
    }
    AdminInstruction.uploadImg(req, res, async function (err) {
      if (err) {
        console.log("error in multer ", err);
        return;
      }
      if (img && fs.existsSync(path.join(__dirname, "..", img))) {
        fs.unlinkSync(path.join(__dirname, "..", img));
      }

      img = AdminInstruction.documentPath + "/" + req.files.country[0].filename;
      let x = "";
      for (let i = 0; i < img.length; i++) {
        if (img[i] == "\\") {
          x += "/";
        } else {
          x += img[i];
        }
      }
      place[index].country.img = x;

      instruct[0].save();
      return res.send({ success: true, message: "Uploaded" });
    });
  } catch (err) {
    console.log("error in admin.js in /vendor", err);
  }
});

router.post("/download", async (req, res) => {
  try {
    const { img } = req.body;
    console.log("download", path.join(__dirname, "..", img));
    //return;
    res.download(path.join(__dirname, "..", img));
  } catch (err) {
    console.log("Error in admin.js in /download", err);
  }
});

router.post("/addGroup", isLoggedIn, async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    let inst = await AdminInstruction.find();
    const { name, group } = req.body;
    if (user.isVerifiedBySuperAdmin) {
      let x;
      if (name == "Company") {
        x = await inst[0].customerGroup;
      } else {
        x = await inst[0].venderGroup;
      }
      x.push({ name: group });
      inst[0].save();
      return res.send({
        success: true,
        data: user,
        message: "Group sucessfully added",
      });
    } else {
      return res.send({
        success: true,
        message: "Oops!!! Only admin can add",
      });
    }
  } catch (err) {
    console.log("error in admin.js in /addGroup", err);
    return res.send({
      success: false,
      message: "Some internal Error can't be added",
    });
  }
});

router.post("/getGroup", async function (req, res) {
  try {
    let inst = await AdminInstruction.find();
    const { name } = req.body;
    let group;
    if (name == "Company") {
      group = await inst[0].customerGroup;
    } else {
      group = await inst[0].venderGroup;
    }
    return res.send({
      success: true,
      data: group,
      message: "Group sucessfully added",
    });
  } catch (err) {
    console.log("error in admin.js in /getGroup", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/group/edit", async (req, res) => {
  try {
    const { name, id, newName } = req.body;
    const inst = await AdminInstruction.find();
    let grp;
    if (name == "Vender") {
      grp = inst[0].venderGroup;
    } else {
      grp = inst[0].customerGroup;
    }
    for (let i = 0; i < grp.length; i++) {
      if (grp[i]._id == id) {
        grp[i].name = newName;
        inst[0].save();
        return res.send({ success: true, message: "Edit Successfully" });
      }
    }
  } catch (err) {
    console.log("error in admin.js in /getGroup", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/user/addGroup", async (req, res) => {
  try {
    const { group, id } = req.body;
    const user = await User.findById(id);
    const name = user.role;
    const inst = await AdminInstruction.find();
    let grp;
    if (name == "supplier") {
      grp = inst[0].venderGroup;
    } else {
      grp = inst[0].customerGroup;
    }
    for (let i = 0; i < grp.length; i++) {
      if (grp[i].name == group) {
        grp[i].user.push(id);
        inst[0].save();
        return res.send({ success: true, message: "Added Successfully" });
      }
    }
  } catch (err) {
    console.log("error in admin.js in /getGroup", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/user/transferGroup", async (req, res) => {
  try {
    const { group, id } = req.body;
    const user = await User.findById(id);
    const name = user.role;
    const inst = await AdminInstruction.find();
    let grp;
    if (name == "supplier") {
      grp = inst[0].venderGroup;
    } else {
      grp = inst[0].customerGroup;
    }
    let index = -1;
    for (let i = 0; i < grp.length; i++) {
      let x = grp[i].user;
      for (let j = 0; j < x.length; j++) {
        if (x[j] == id) {
          index = j;
          break;
        }
      }
      if (grp[i].name == "Block") {
        user.isBlock = false;
        user.save();
      }
      if (index != -1) {
        x.splice(index, 1);
        break;
      }
    }
    for (let i = 0; i < grp.length; i++) {
      if (grp[i].name == "Block") {
        user.isBlock = true;
        user.save();
      }
      if (grp[i].name == group) {
        grp[i].user.push(id);
        inst[0].save();
        return res.send({ success: true, message: "Transfer Successfully" });
      }
    }
  } catch (err) {
    console.log("error in admin.js in /getGroup", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.get("/getQuery", async (req, res) => {
  try {
    const query = await Query.find();
    query.reverse();
    return res.send({
      success: true,
      data: query,
    });
  } catch (err) {
    console.log("error in admin.js in /getQuery", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.get("/getReply", async (req, res) => {
  try {
    let client_confirm = [],
      vender_confirm = [],
      hold = [],
      cancel = [],
      all = [];

    const user = await User.find();
    for (let i = 0; i < user.length; i++) {
      if (user[i].role == "supplier") {
        let inq = user[i].inquery;
        for (let j = 0; j < inq.length; j++) {
          let invoiceHistory = await InvoiceHistory.findOne({
            vendorId: user[i]._id,
            queryId: inq[j].queryId,
          });

          let history = invoiceHistory.history;

          const invoice = await Invoice.findById(history[history.length - 1]);
          if (inq[j].client_confirm) {
            client_confirm.push(invoice);
          } else if (inq[j].vender_confirm) {
            vender_confirm.push(invoice);
          } else if (inq[j].cancel) {
            cancel.push(invoice);
          } else {
            hold.push(invoice);
          }
          all.push(invoice);
        }
      }
    }
    return res.send({
      success: true,
      data: { all, client_confirm, vender_confirm, cancel, hold },
    });
  } catch (err) {
    console.log("error in admin.js in /getReply", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const query = await Query.find();
    const user = await User.find();
    const inst = await AdminInstruction.find();
    let cat = [];
    let ratio = [];
    let date = [];
    if (inst[0].category) {
      cat = inst[0].category;
    }

    for (let i = 0; i < cat.length; i++) {
      ratio.push({
        name: cat[i].name,
        count: 0,
        c: 0,
      });
    }
    let ans = [];
    ans.push({
      name: "Total Inquery",
      count: query.length,
    });
    let vender = 0,
      customer = 0;
    for (let i = 0; i < user.length; i++) {
      if (user[i].role == "client") customer++;
      if (user[i].role == "supplier") vender++;
    }
    ans.push({
      name: "Total Customer",
      count: customer,
    });
    ans.push({
      name: "Total Vendor",
      count: vender,
    });
    let hold = 0,
      client_confirm = 0,
      vender_confirm = 0,
      cancel = 0,
      newInq = 0;
    for (let i = 0; i < query.length; i++) {
      if (query[i].hold == true) hold++;
      if (query[i].client_confirm == true) client_confirm++;
      if (query[i].vender_confirm == true) vender_confirm++;
      if (query[i].cancel == true) cancel++;
      if (query[i].newInquery == true) newInq++;

      for (let j = 0; j < ratio.length; j++) {
        if (query[i].queryType == ratio[j].name) {
          ratio[j].count++;
          break;
        }
      }
      date.push(query[i].createdAt);
    }
    ans.push({
      name: "Vender Confirmed",
      count: vender_confirm,
    });
    ans.push({
      name: "Client Confirmed",
      count: client_confirm,
    });
    ans.push({
      name: "On Hold",
      count: hold,
    });
    ans.push({
      name: "Cancelled",
      count: cancel,
    });
    ans.push({
      name: "New Inquery",
      count: newInq,
    });
    return res.send({
      success: true,
      data: {
        information: ans,
        ratio: ratio,
        date: date,
      },
    });
  } catch (err) {
    console.log("error in admin.js in /dashboard", err);
    return res.send({
      success: false,
      message: "Some internal Error",
    });
  }
});

router.post("/companyDetail", async (req, res) => {
  try {
    // console.log(req.body.email)
    let detail = await CompanyDetail.find();
    if (detail.length > 0) {
      detail[0].name = req.body.name;
      detail[0].email = req.body.email;
      detail[0].address = req.body.address;
      detail[0].country = req.body.country;
      detail[0].state = req.body.state;
      detail[0].city = req.body.city;
      detail[0].pin = req.body.pin;
      detail[0].phone1 = req.body.phone1;
      detail[0].phone2 = req.body.phone2;
      detail[0].gstNo = req.body.gstNo;
      detail[0].panNo = req.body.panNo;
      detail[0].tagline = req.body.tagline;
      detail[0].save();
    } else {
      let d = await new CompanyDetail(req.body);
      d.save();
    }
    // console.log(detail[0].email)
    return res.send({
      success: true,
    });
  } catch (err) {
    console.log("error in admin.js in /companyDetail", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/companyLogo", async (req, res) => {
  try {
    let company = await CompanyDetail.find();

    let logo = company[0].logo;
    let newLogo = "";
    if (logo) {
      newLogo = logo;
    }

    CompanyDetail.uploadDocument(req, res, async function (err) {
      if (err) {
        console.log("error in multer ", err);
      }

      if (req.files.logo) {
        if (newLogo && fs.existsSync(path.join(__dirname, "..", newLogo))) {
          fs.unlinkSync(path.join(__dirname, "..", newLogo));
        }

        newLogo = CompanyDetail.documentPath + "/" + req.files.logo[0].filename;
      }
      company[0].logo = newLogo;
      company[0].save();
    });
    return res.send({ success: true });
  } catch (err) {
    console.log("error in admin.js in /companyLogo", err);
    return res.send({
      success: false,
      message: "Some internal Error can't save logo",
    });
  }
});

router.get("/getCompanyInfo", async (req, res) => {
  try {
    let detail = await CompanyDetail.find();
    return res.send({
      success: true,
      data: detail[0],
    });
  } catch (err) {
    console.log("error in admin.js in /companyDetail", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.get("/comapanylogoDownload", async (req, res) => {
  try {
    let detail = await CompanyDetail.find();
    if (detail.length > 0 && detail[0].logo) {
      let logo = detail[0].logo;
      let x = "";
      for (let i = 0; i < logo.length; i++) {
        if (logo[i] == "\\") {
          x += "/";
        } else {
          x += logo[i];
        }
      }
      console.log(x);
      return res.download(path.join(__dirname, "..", x));
    }
    return res.send({ success: false });
  } catch (err) {
    console.log("error in admin.js in /companyDetail", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/addDepartment", async (req, res) => {
  try {
    console.log(req.body);
    let detail = await CompanyDetail.find();
    let department = detail[0].department;
    department.push(req.body);
    detail[0].save();
    return res.send({
      success: true,
      message: "Department added",
    });
  } catch (err) {
    console.log("error in admin.js in /addDepartment", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.get("/getDepartment", async (req, res) => {
  try {
    let detail = await CompanyDetail.find();
    let department = detail[0].department;

    return res.send({
      success: true,
      data: department,
    });
  } catch (err) {
    console.log("error in admin.js in /getDepartment", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/addRole", async (req, res) => {
  try {
    let detail = await CompanyDetail.find();
    let department = detail[0].department;
    for (let i = 0; i < department.length; i++) {
      if (department[i].name == req.body.department) {
        department[i].role.push({ name: req.body.role });
        break;
      }
    }
    detail[0].save();
    return res.send({
      success: true,
      message: "Role added",
    });
  } catch (err) {
    console.log("error in admin.js in /addCity", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/activeDeactive_depart_role", async (req, res) => {
  try {
    console.log(req.body);
    let detail = await CompanyDetail.find();
    let department = detail[0].department;
    let mess;
    if (req.body.comp == "department") {
      for (let i = 0; i < department.length; i++) {
        if (department[i]._id == req.body.id) {
          if (department[i].active) {
            department[i].active = false;
            mess = "Deactivated successfully";
          } else {
            department[i].active = true;
            mess = "Activated successfully";
          }
          break;
        }
      }
    } else {
      let ok = false;
      for (let i = 0; i < department.length; i++) {
        let role = department[i].role;
        for (let j = 0; j < role.length; j++) {
          if (role[j]._id == req.body.id) {
            if (role[j].active) {
              role[j].active = false;
              mess = "Deactivated successfully";
            } else {
              role[j].active = true;
              mess = "Activated successfully";
            }
            ok = true;
            break;
          }
          if (ok) break;
        }
      }
    }

    detail[0].save();
    return res.send({
      success: true,
      message: mess,
    });
  } catch (err) {
    console.log("error in admin.js in /addCity", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/delete_depart_role", async (req, res) => {
  try {
    console.log(req.body);
    let detail = await CompanyDetail.find();
    let department = detail[0].department;
    let mess;
    if (req.body.comp == "department") {
      for (let i = 0; i < department.length; i++) {
        if (department[i]._id == req.body.id) {
          department.splice(i, 1);
          break;
        }
      }
    } else {
      let ok = false;
      for (let i = 0; i < department.length; i++) {
        let role = department[i].role;
        for (let j = 0; j < role.length; j++) {
          if (role[j]._id == req.body.id) {
            role.splice(j, 1);
            ok = true;
            break;
          }
          if (ok) break;
        }
      }
    }

    detail[0].save();
    return res.send({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    console.log("error in admin.js in /addCity", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/edit_depart_role", async (req, res) => {
  try {
    console.log(req.body);
    let detail = await CompanyDetail.find();
    let department = detail[0].department;
    let mess;
    if (req.body.comp == "department") {
      for (let i = 0; i < department.length; i++) {
        if (department[i]._id == req.body.id) {
          console.log("yes");
          department[i].name = req.body.name;
          break;
        }
      }
    } else {
      let ok = false;
      for (let i = 0; i < department.length; i++) {
        let role = department[i].role;
        for (let j = 0; j < role.length; j++) {
          if (role[j]._id == req.body.id) {
            role[j].name = req.body.name;
            ok = true;
            break;
          }
          if (ok) break;
        }
      }
    }
    console.log(detail[0]);

    detail[0].save();
    return res.send({
      success: true,
      message: "Edited successfully",
    });
  } catch (err) {
    console.log("error in admin.js in /edit_depart_role", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/finance", async (req, res) => {
  try {
    const { comp, name, percentage, symbol } = req.body;
    const instruct = await AdminInstruction.find();
    let x, mess;
    if (comp == "Tax") {
      if (instruct.length == 0) {
        let tax = [];
        let t = { name: name, percentage: percentage };
        tax.push(t);
        inst = await new AdminInstruction({
          tax: t,
        });

        inst.save();
      } else {
        x = instruct[0].tax;
        x.push({ name: name, percentage: percentage });
      }
    } else {
      if (instruct.length == 0) {
        let currency = [];
        let c = { name: name, symbol: symbol };
        currency.push(c);
        inst = await new AdminInstruction({
          currency: c,
        });

        inst.save();
      } else {
        x = instruct[0].currency;
        x.push({ name: name, symbol: symbol });
      }
    }
    instruct[0].save();
    return res.send({
      success: true,
      message: "Added successfully",
    });
  } catch (err) {
    console.log("error in admin.js in /finance", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.get("/getfinance", async (req, res) => {
  try {
    const instruct = await AdminInstruction.find();
    let x, y;
    x = instruct[0].tax;
    y = instruct[0].currency;

    return res.send({
      success: true,
      data: { tax: x, currency: y },
    });
  } catch (err) {
    console.log("error in admin.js in /getfinance", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/activeDeactive_curr_tax", async (req, res) => {
  try {
    const { comp, id } = req.body;
    const instruct = await AdminInstruction.find();
    let x, mess;
    if (comp == "Tax") {
      x = instruct[0].tax;
    } else {
      x = instruct[0].currency;
    }
    for (let i = 0; i < x.length; i++) {
      if (x[i]._id == id) {
        if (x[i].active) {
          x[i].active = false;
          mess = "Deactivated";
        } else {
          x[i].active = true;
          mess = "Activated";
        }
      }
    }
    instruct[0].save();
    return res.send({
      success: true,
      message: mess,
    });
  } catch (err) {
    console.log("error in admin.js in /activeDeactive_curr_tax", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/delete_curr_tax", async (req, res) => {
  try {
    const { comp, id } = req.body;
    const instruct = await AdminInstruction.find();
    let x, mess;
    if (comp == "Tax") {
      x = instruct[0].tax;
    } else {
      x = instruct[0].currency;
    }
    for (let i = 0; i < x.length; i++) {
      if (x[i]._id == id) {
        x.splice(i, 1);
        break;
      }
    }
    instruct[0].save();
    return res.send({
      success: true,
      message: "Deleted",
    });
  } catch (err) {
    console.log("error in admin.js in /delete_curr_tax", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/addpermission", async (req, res) => {
  try {
    const { permission, id } = req.body;
    let detail = await CompanyDetail.find();
    let department = detail[0].department;
    let ok = false;
    for (let i = 0; i < department.length; i++) {
      let role = department[i].role;
      for (let j = 0; j < role.length; j++) {
        if (role[j]._id == id) {
          role[j].permissions = permission;
          ok = true;
          break;
        }
      }
      if (ok) break;
    }
    detail[0].save();
    return res.send({
      success: true,
      message: "Added Permission",
    });
  } catch (err) {
    console.log("error in admin.js in /delete_curr_tax", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/assign_curr_tax", async (req, res) => {
  try {
    const { comp, id, country } = req.body;
    const instruct = await AdminInstruction.find();
    let x, mess;
    if (comp == "Tax") {
      x = instruct[0].tax;
    } else {
      x = instruct[0].currency;
    }
    for (let i = 0; i < x.length; i++) {
      if (x[i]._id == id) {
        x[i].country = country;
        console.log(x[i]);
        break;
      }
    }

    instruct[0].save();
    return res.send({
      success: true,
      message: "Added",
    });
  } catch (err) {
    console.log("error in admin.js in /assign_curr_tax", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/edit_curr_tax", async (req, res) => {
  try {
    const { comp, id, name, number } = req.body;
    const instruct = await AdminInstruction.find();
    let x, mess;
    if (comp == "Tax") {
      x = instruct[0].tax;
    } else {
      x = instruct[0].currency;
    }
    for (let i = 0; i < x.length; i++) {
      if (x[i]._id == id) {
        x[i].name = name;
        if (comp == "Tax") {
          x[i].percentage = number;
        } else {
          x[i].symbol = number;
        }
        break;
      }
    }

    instruct[0].save();
    return res.send({
      success: true,
      message: "Edited",
    });
  } catch (err) {
    console.log("error in admin.js in /assign_curr_tax", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/adminProfilePic/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    let user = await User.findById(id);
    console.log(user);

    let document = user.document;
    let newdocument = {
      document: {
        logo: "",
      },
    };

    if (document) {
      newdocument.document = document;
    }

    User.uploadDocument(req, res, async function (err) {
      if (err) {
        console.log("error in multer ", err);
      }
      if (
        newdocument.document.logo &&
        fs.existsSync(path.join(__dirname, "..", newdocument.document.logo))
      ) {
        fs.unlinkSync(path.join(__dirname, "..", newdocument.document.logo));
      }

      newdocument.document.logo =
        User.documentPath + "/" + req.files.logo[0].filename;

      console.log("newdocument", newdocument, newdocument.document.logo);
      await User.findByIdAndUpdate(id, newdocument);
      user = await User.findById(id);
      console.log("user.document", user.document);
      user.save();
      return res.send({ success: true });
    });
  } catch (err) {
    console.log("error in admin.js in /newAdminLogo", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.get("/getAdmin", async (req, res) => {
  try {
    let user = await User.find();
    let ans = [];
    for (let i = 0; i < user.length; i++) {
      if (user[i].role == "admin") {
        ans.push(user[i]);
      }
    }

    return res.send({
      success: true,
      data: ans,
    });
  } catch (err) {
    console.log("error in admin.js in /getAdmin", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

router.post("/getPermission", async (req, res) => {
  try {
    const { depart, role } = req.body;
    let inst = await Company.find();
    let d;
    if (inst[0].department) {
      d = inst[0].department;
    }
    let ans;
    for (let i = 0; i < d.length; i++) {
      if (d[i].name == depart) {
        let r = d[i].role;
        ok = false;
        for (let j = 0; j < r.length; j++) {
          if (r[j].name == role) {
            ans = r[j].permissions;
            ok = true;
            break;
          }
        }
        if (ok) break;
      }
    }

    return res.send({
      success: true,
      data: ans,
    });
  } catch (err) {
    console.log("error in admin.js in /getAdmin", err);
    return res.send({
      success: false,
      message: "Some internal Error ",
    });
  }
});

module.exports = router;
