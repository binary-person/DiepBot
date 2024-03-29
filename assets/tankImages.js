const tankImages = {
    "Tank": "https://static.wikia.nocookie.net/diepio/images/9/97/Tank_NAV_Icon1.png",
    "Twin": "https://static.wikia.nocookie.net/diepio/images/f/f3/Twin_NAV_Icon1.png",
    "Sniper": "https://static.wikia.nocookie.net/diepio/images/7/77/Sniper_NAV_Icon1.png",
    "Machine Gun": "https://static.wikia.nocookie.net/diepio/images/3/30/MachineGun_NAV_Icon1.png",
    "Flank Guard": "https://static.wikia.nocookie.net/diepio/images/3/38/FlankGuard_NAV_Icon1.png",
    "Triple Shot": "https://static.wikia.nocookie.net/diepio/images/2/29/TripleShot_NAV_Icon1.png",
    "Quad Tank": "https://static.wikia.nocookie.net/diepio/images/7/73/QuadTank_NAV_Icon1.png",
    "Twin Flank": "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D",
    "Assassin": "https://static.wikia.nocookie.net/diepio/images/e/e7/Assassin_NAV_Icon1.png",
    "Overseer": "https://static.wikia.nocookie.net/diepio/images/a/a1/Overseer_NAV_Icon1.png",
    "Hunter": "https://static.wikia.nocookie.net/diepio/images/2/2b/Hunter_NAV_Icon1.png",
    "Trapper": "https://static.wikia.nocookie.net/diepio/images/7/7a/Trapper_NAV_Icon1.png",
    "Destroyer": "https://static.wikia.nocookie.net/diepio/images/f/f6/Destroyer_NAV_Icon1.png",
    "Gunner": "https://static.wikia.nocookie.net/diepio/images/d/d7/Gunner_NAV_Icon1.png",
    "Tri-Angle": "https://static.wikia.nocookie.net/diepio/images/e/ef/Tri-angle_NAV_Icon1.png",
    "Auto 3": "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D",
    "Smasher": "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D",
    "Triple Twin": "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D",
    "Battleship": "https://static.wikia.nocookie.net/diepio/images/d/dc/Battleship_NAV_Icon2.png",
    "Octo Tank": "https://static.wikia.nocookie.net/diepio/images/0/09/OctoTank_NAV_Icon1.png",
    "Auto 5": "https://static.wikia.nocookie.net/diepio/images/d/dd/Auto5_NAV_icon2.png",
    "Triplet": "https://static.wikia.nocookie.net/diepio/images/a/a3/Triplet_NAV_Icon1.png",
    "Penta Shot": "https://static.wikia.nocookie.net/diepio/images/8/87/PentaShot_NAV_Icon1.png",
    "Spread Shot": "https://static.wikia.nocookie.net/diepio/images/8/8d/SpreadShot_NAV_Icon1.png",
    "Overlord": "https://static.wikia.nocookie.net/diepio/images/1/18/Overlord_NAV_Icon1.png",
    "Necromancer": "https://static.wikia.nocookie.net/diepio/images/e/ee/Necromancer_NAV_Icon1.png",
    "Manager": "https://static.wikia.nocookie.net/diepio/images/d/d1/Manager_NAV_Icon1.png",
    "Overtrapper": "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D",
    "Factory": "https://static.wikia.nocookie.net/diepio/images/4/47/Factory_NAV_Icon1.png",
    "Ranger": "https://static.wikia.nocookie.net/diepio/images/f/f4/Ranger_NAV_Icon1.png",
    "Stalker": "https://static.wikia.nocookie.net/diepio/images/0/0b/Stalker_NAV_Icon1.png",
    "Booster": "https://static.wikia.nocookie.net/diepio/images/1/14/Booster_NAV_Icon1.png",
    "Fighter": "https://static.wikia.nocookie.net/diepio/images/2/24/Fighter_NAV_Icon1.png",
    "Hybrid": "https://static.wikia.nocookie.net/diepio/images/5/55/Hybrid_NAV_Icon1.png",
    "Annihilator": "https://static.wikia.nocookie.net/diepio/images/0/06/Annihilator_NAV_Icon1.png",
    "Skimmer": "https://static.wikia.nocookie.net/diepio/images/0/09/Skimmer_NAV_Icon1.png",
    "Rocketeer": "https://static.wikia.nocookie.net/diepio/images/d/d3/Rocketeer_NAV_Icon1.png",
    "Predator": "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D",
    "Streamliner": "https://static.wikia.nocookie.net/diepio/images/6/66/Streamliner_NAV_Icon2.png",
    "Tri-Trapper": "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D",
    "Gunner Trapper": "https://static.wikia.nocookie.net/diepio/images/d/df/GunnerTrapper_NAV_Icon1.png",
    "Mega Trapper": "data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D",
    "Auto Trapper": "https://static.wikia.nocookie.net/diepio/images/5/57/AutoTrapper_NAV_Icon1.png",
    "Landmine": "https://static.wikia.nocookie.net/diepio/images/c/c8/Landmine_NAV_Icon1.png",
    "Auto Smasher": "https://static.wikia.nocookie.net/diepio/images/d/df/AutoSmasher_NAV_Icon1.png",
    "Spike": "https://static.wikia.nocookie.net/diepio/images/5/51/Spike_NAV_Icon1.png",
    "Sprayer": "https://static.wikia.nocookie.net/diepio/images/f/f3/Sprayer_NAV_Icon1.png",
    "Auto Gunner": "https://static.wikia.nocookie.net/diepio/images/8/83/AutoGunner_NAV_Icon1.png",
    "Glider": "https://static.wikia.nocookie.net/diepio/images/b/b1/Glider_icon_new.png"
};

module.exports = {
    rawData: tankImages,
    randomTank: () => {
        const keys = Object.keys(tankImages);
        const name = keys[Math.floor(keys.length * Math.random())];
        return { name, imageUrl: tankImages[name] };
    }
};
