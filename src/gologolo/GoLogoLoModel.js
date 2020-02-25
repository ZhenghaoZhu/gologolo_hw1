import AppsterModel from '../appster/AppsterModel.js'
import GoLogoLoLogo from './GoLogoLoLogo.js'
import { GoLogoLoDefaults } from './GoLogoLoConstants.js'

export default class GoLogoLoModel extends AppsterModel {
    constructor() {
        super();
        this.currentWork = null;
    }

    createNewWork(workName) {
        let newRandomText = new GoLogoLoText(workName);
        return newRandomText;
    }

    loadWorkData(workToLoad) {
        console.log("load " + workToLoad.getName());
    }

    makeColor(colorData) {
        return "rgb(" + colorData.red + ", " + colorData.green + ", " + colorData.blue + ")";
    }

    buildAppWork(workArray, name) {
        let appWork = new GoLogoLoLogo();

        // FIND THE WORK DATA FROM THE JSON OBJECT
        for (let i = 0; i < workArray.length; i++) {
            let jsonWork = workArray[i];
            if (jsonWork.name === name) {
                // WE'VE FOUND IT, NOW LOAD ALL OF ITS DATA
                appWork.setName(name);
                appWork.setText(jsonWork.text);
                appWork.setFontSize(jsonWork.font_size);
                appWork.setTextColor(jsonWork.text_color);
                appWork.setBackgroundColor(jsonWork.background_color);
                appWork.setBorder(jsonWork.border);
                appWork.setBorderColor(jsonWork.border_color);
                appWork.setBorderRadius(jsonWork.border_radius);
                appWork.setBorderWidth(jsonWork.border_width);
                appWork.setPadding(jsonWork.padding);
                appWork.setMargin(jsonWork.margin);
            }
        }

        return appWork;
    }

    updateText(name) { // To add new work into workList
        let appWork = new GoLogoLoLogo();
        
        appWork.setName(name);
        appWork.setText(GoLogoLoDefaults.GOLOGOLO_DEFAULT_TEXT);
        appWork.setFontSize(GoLogoLoDefaults.GOLOGOLO_DEFAULT_FONT_SIZE);
        appWork.setTextColor(GoLogoLoDefaults.GOLOGOLO_DEFAULT_TEXT_COLOR);
        appWork.setBackgroundColor(GoLogoLoDefaults.GOLOGOLO_DEFAULT_BACKGROUND_COLOR);
        appWork.setBorder(GoLogoLoDefaults.GOLOGOLO_DEFAULT_BORDER);
        appWork.setBorderColor(GoLogoLoDefaults.GOLOGOLO_DEFAULT_BORDER_COLOR);
        appWork.setBorderRadius(GoLogoLoDefaults.GOLOGOLO_DEFAULT_BORDER_RADIUS);
        appWork.setBorderWidth(GoLogoLoDefaults.GOLOGOLO_DEFAULT_BORDER_WIDTH);
        appWork.setPadding(GoLogoLoDefaults.GOLOGOLO_DEFAULT_PADDING);
        appWork.setMargin(GoLogoLoDefaults.GOLOGOLO_DEFAULT_MARGIN);

        return appWork;
    }
}

// DONE