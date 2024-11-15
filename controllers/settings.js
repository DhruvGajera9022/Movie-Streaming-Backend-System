const Settings = require("../models/settings");
const fs = require("fs");
require("dotenv").config();
const { body, validationResult } = require('express-validator');



// To display setting page
const displaySettings = async (req, res) => {
    const id = req.params.id;

    if (id) {
        const settings = await Settings.findOne({ where: { id: id } });

        if (settings) {
            res.render("settings/settings", {
                title: "Edit Settings",
                settingsData: settings,
            });
        } else {
            res.status(404).send("Settings not found");
        }
    } else {
        res.render("settings/settings", {
            title: "Add Settings",
            settingsData: null,
        });
    }
}
// To add settings
const addSettings = async (req, res) => {
    let { id, email, phone, facebook, twitter, linkedIn, instagram, app_store, play_store, privacy_policy, description, image_old, term_condition } = req.body;
    let image = req.file ? req.file.filename : image_old;

    if (req.file && image_old) {
        fs.unlink(`assets/img/settingImages/${image_old}`, (err) => {
            if (err) {
                console.error("Failed to delete old image:", err);
            }
        });
    }

    if (id) {
        const [isSettingUpdated] = await Settings.update({
            email,
            phone,
            facebook,
            twitter,
            linkedIn,
            instagram,
            app_store,
            play_store,
            logo: image,
            privacy_policy,
            description,
            term_condition,
        }, { where: { id } });

        if (isSettingUpdated) {
            return res.redirect("/settings");
        } else {
            return res.status(400).send("Failed to edit settings");
        }
    } else {
        const existingSettings = await getAllSettings();

        if (existingSettings.length > 0) {
            const [isSettingUpdated] = await Settings.update({
                email,
                phone,
                facebook,
                twitter,
                linkedIn,
                instagram,
                app_store,
                play_store,
                logo: image,
                privacy_policy,
                description,
                term_condition,
            }, { where: { id: existingSettings[0].id } });

            if (isSettingUpdated) {
                return res.redirect("/settings");
            } else {
                return res.status(400).send("Failed to edit settings");
            }
        } else {
            const newSetting = await Settings.create({
                email,
                phone,
                facebook,
                twitter,
                linkedIn,
                instagram,
                app_store,
                play_store,
                logo: image,
                privacy_policy,
                description,
                term_condition
            });

            if (newSetting) {
                return res.redirect("/settings");
            } else {
                return res.status(400).send("Failed to add settings");
            }
        }
    }
};



// To get all settings data
const getAllSettings = async () => {
    return await Settings.findAll({});
}



// To display in settings page
const getSettings = async (req, res) => {
    let settings = await getAllSettings();

    return res.json(settings);
}



// get API for settings
const settingsAPI = async (req, res) => {
    let settings = await getAllSettings();
    let baseURL = `${process.env.URL}${process.env.PORT}`;

    settings = settings.map((setting) => {
        return settingObject = {
            id: setting.id,
            email: setting.email,
            phone: setting.phone,
            facebook: setting.facebook,
            twitter: setting.twitter,
            linkedIn: setting.linkedIn,
            instagram: setting.instagram,
            app_store: setting.app_store,
            play_store: setting.play_store,
            description: setting.description,
            privacy_policy: setting.privacy_policy,
            term_condition: setting.term_condition,
            logo: `${baseURL}/img/settingImages/${setting.logo}`,
        }
    });

    return res.json({
        status: true,
        data: { ...settingObject }
    });
}



module.exports = {
    addSettings,
    displaySettings,
    getSettings,
    settingsAPI,
}
