class ModdingAPI {
    constructor() {
        this.mods = [];
    }

    loadMod(mod) {
        if (this.validateMod(mod)) {
            this.mods.push(mod);
            mod.applyMod();
            console.log(`Mod "${mod.name}" version ${mod.version} loaded successfully.`);
        } else {
            console.error(`Failed to load mod "${mod.name}".`);
        }
    }

    validateMod(mod) {
        // Basic validation
        if (!mod.name || !mod.version || typeof mod.applyMod !== 'function') {
            return false;
        }
        return true;
    }

    applyAllMods() {
        this.mods.forEach(mod => mod.applyMod());
    }

    getMods() {
        return this.mods;
    }
}

const ModAPI = new ModdingAPI();
