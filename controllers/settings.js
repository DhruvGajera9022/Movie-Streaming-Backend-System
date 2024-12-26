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
    try {
        const {
            id, email, phone, facebook, twitter, linkedIn, instagram,
            app_store, play_store, privacy_policy, description, image_old, term_condition
        } = req.body;

        const image = req.file ? req.file.filename : image_old;

        // Delete the old image if a new image is uploaded
        if (req.file && image_old) {
            try {
                await fs.unlink(`assets/img/settingImages/${image_old}`);
            } catch (err) {
                console.error("Failed to delete old image:", err);
            }
        }

        // Define the new settings object
        const settingsData = {
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
        };

        if (id) {
            // Update settings by ID
            const [isSettingUpdated] = await Settings.update(settingsData, { where: { id } });

            if (isSettingUpdated) {
                return res.redirect("/settings");
            } else {
                return res.status(400).send("Failed to edit settings");
            }
        } else {
            // Check for existing settings
            const existingSettings = await getAllSettings();

            if (Array.isArray(existingSettings) && existingSettings.length > 0) {
                // Update the first existing setting
                const [isSettingUpdated] = await Settings.update(
                    settingsData,
                    { where: { id: existingSettings[0].id } }
                );

                if (isSettingUpdated) {
                    return res.redirect("/settings");
                } else {
                    return res.status(400).send("Failed to edit settings");
                }
            } else {
                // Create new settings
                const newSetting = await Settings.create(settingsData);

                if (newSetting) {
                    return res.redirect("/settings");
                } else {
                    return res.status(400).send("Failed to add settings");
                }
            }
        }
    } catch (error) {
        console.error("Error in addSettings:", error);
        return res.status(500).send("An error occurred while processing your request.");
    }
};



// To get all settings data
const getAllSettings = async () => {
    return await Settings.findOne({});
}



// To display in settings page
const getSettings = async (req, res) => {
    let settings = await getAllSettings();

    return res.json(settings);
}



// get API for settings
const settingsAPI = async (req, res) => {
    let settings = await getAllSettings();

    const settingObject = {
        id: settings.id,
        email: settings.email,
        phone: settings.phone,
        facebook: settings.facebook,
        twitter: settings.twitter,
        linkedIn: settings.linkedIn,
        instagram: settings.instagram,
        app_store: settings.app_store,
        play_store: settings.play_store,
        description: settings.description,
        privacy_policy: settings.privacy_policy,
        term_condition: settings.term_condition,
        logo: `${process.env.URL}/img/settingImages/${settings.logo}`,
    }

    return res.json({
        status: true,
        data: settingObject
    });
}



module.exports = {
    addSettings,
    displaySettings,
    getSettings,
    settingsAPI,
}
