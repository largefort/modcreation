class ModdingAPI {
    constructor() {
        this.mods = [];
        this.loadModsFromStorage();
    }

    loadMod(mod) {
        if (this.validateMod(mod)) {
            this.mods.push(mod);
            mod.applyMod();
            console.log(`Mod "${mod.name}" version ${mod.version} loaded successfully.`);
            this.saveModToStorage(mod);
        } else {
            console.error(`Failed to load mod "${mod.name}".`);
        }
    }

    validateMod(mod) {
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

    saveModToStorage(mod) {
        let storedMods = JSON.parse(localStorage.getItem('mods')) || [];
        storedMods.push(mod);
        localStorage.setItem('mods', JSON.stringify(storedMods));
    }

    loadModsFromStorage() {
        let storedMods = JSON.parse(localStorage.getItem('mods')) || [];
        storedMods.forEach(mod => {
            if (this.validateMod(mod)) {
                this.mods.push(mod);
            }
        });
        this.applyAllMods();
    }

    clearAllMods() {
        this.mods = [];
        localStorage.removeItem('mods');
        console.log('All mods cleared from storage.');
    }

    removeMod(modName) {
        this.mods = this.mods.filter(mod => mod.name !== modName);
        let storedMods = JSON.parse(localStorage.getItem('mods')) || [];
        storedMods = storedMods.filter(mod => mod.name !== modName);
        localStorage.setItem('mods', JSON.stringify(storedMods));
        console.log(`Mod "${modName}" removed.`);
    }
}

const ModAPI = new ModdingAPI();
