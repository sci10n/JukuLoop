import {Stage} from "../types/Srs";

export const stage_color = (stage: Stage) => {
        switch (stage) {
            case Stage.Apprentice1:
                return "#D81B60";
            case Stage.Apprentice2:
                return "#D81B60";
            case Stage.Apprentice3:
                return "#D81B60";
            case Stage.Apprentice4:
                return "#D81B60";
            case Stage.Guru1:
                return "#1E88E5";
            case Stage.Guru2:
                return "#1E88E5";
            case Stage.Master:
                return "#004D40";
            case Stage.Enlightened:
                return "#EBDACC";
            case Stage.Burned:
                return "#360C2D";
        }
    }

export const stage_name = (stage: Stage) => {
        switch (stage) {
            case Stage.Apprentice1:
                return "Apprentice 1";
            case Stage.Apprentice2:
                return "Apprentice 2";
            case Stage.Apprentice3:
                return "Apprentice 3";
            case Stage.Apprentice4:
                return "Apprentice 4";
            case Stage.Guru1:
                return "Guru 1";
            case Stage.Guru2:
                return "Guru 2";
            case Stage.Master:
                return "Master";
            case Stage.Enlightened:
                return "Enlightened";
            case Stage.Burned:
                return "Burned";
        }
    }
