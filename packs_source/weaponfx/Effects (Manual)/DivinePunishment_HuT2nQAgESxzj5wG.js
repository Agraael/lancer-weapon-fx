const { targetsMissed, targetTokens, sourceToken } = game.modules
    .get("lancer-weapon-fx")
    .api.getMacroVariables(this, typeof token !== "undefined" ? token : null);

const pathVariantMissile = game.modules.get("lancer-weapon-fx").api.getSequencerPathVariant("jb2a.pack_hound_missile");

await Sequencer.Preloader.preloadForClients([
    "modules/lancer-weapon-fx/soundfx/Missile_Launch.ogg",
    "modules/lancer-weapon-fx/soundfx/Missile_Travel.ogg",
    pathVariantMissile,
    "jb2a.explosion.01.orange",
    "modules/lancer-weapon-fx/soundfx/Missile_Impact.ogg",
]);

const sequences = targetTokens.map((target, i) => {
    const sequence = new Sequence();
    if (i) {
        sequence.wait(175 * i);
    }
    sequence
        .sound()
            .file("modules/lancer-weapon-fx/soundfx/Missile_Launch.ogg")
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5));
    sequence
        .sound()
            .file("modules/lancer-weapon-fx/soundfx/Missile_Travel.ogg")
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5))
            .timeRange(700, 2000);
    sequence
        .effect()
            .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
            .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
            .file(pathVariantMissile)
            .atLocation(sourceToken)
            .stretchTo(target)
            .missed(targetsMissed.has(target.id))
            .name("impact")
            .waitUntilFinished(-3200);
    sequence
        .effect()
            .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
            .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
            .file("jb2a.explosion.01.orange")
            .atLocation("impact")
            .scale(0.8)
            .zIndex(1)
            .waitUntilFinished(-1300);

    if (!targetsMissed.has(target.id)) {
        sequence
            .sound()
                .file("modules/lancer-weapon-fx/soundfx/Missile_Impact.ogg")
                .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5))
                .waitUntilFinished(-8500);
    }
    return sequence.play();
});

await Promise.all(sequences);
