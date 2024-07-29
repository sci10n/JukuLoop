import {Stage} from "../types/Srs";

export const stage_color = (stage: Stage) => {
        switch (stage) {
            case Stage.Apprentice1:
                return "#8BC34A";
            case Stage.Apprentice2:
                return "#4CAF50";
            case Stage.Apprentice3:
                return "#388E3C";
            case Stage.Apprentice4:
                return "#1B5E20";
            case Stage.Guru1:
                return "#64B5F6";
            case Stage.Guru2:
                return "#2196F3";
            case Stage.Master:
                return "#1A237E";
            case Stage.Enlightened:
                return "#7B1FA2";
            case Stage.Burned:
                return "#D32F2f";
        }
    }

export const stage_name = (stage: Stage) => {
        switch (stage) {
            case Stage.Apprentice1:
                return "Apprentice";
            case Stage.Apprentice2:
                return "Apprentice";
            case Stage.Apprentice3:
                return "Apprentice";
            case Stage.Apprentice4:
                return "Apprentice";
            case Stage.Guru1:
                return "Guru";
            case Stage.Guru2:
                return "Guru";
            case Stage.Master:
                return "Master";
            case Stage.Enlightened:
                return "Enlightened";
            case Stage.Burned:
                return "Burned";
        }
    }
