const { targetsMissed, targetsCrit, targetTokens, sourceToken } = game.modules
    .get("lancer-weapon-fx")
    .api.getMacroVariables(this, typeof token !== "undefined" ? token : null);
game.modules.get("lancer-weapon-fx").api.preloadMissAndCrit();

await Sequencer.Preloader.preloadForClients([
    "modules/lancer-weapon-fx/soundfx/AssaultCannonFire.ogg",
    "jb2a.bullet.01.orange",
]);

let sequence = new Sequence();

for (let i = 0; i < targetTokens.length; i++) {
    let target = targetTokens[i];
    sequence
        .sound()
            .file("modules/lancer-weapon-fx/soundfx/AssaultCannonFire.ogg")
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5));
    sequence
        .effect()
            .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
            .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
            .file("jb2a.bullet.01.orange")
            .atLocation(sourceToken)
            .stretchTo(target)
            .missed(targetsMissed.has(target.id))
            .name(`impact${i}`)
            .scale(0.5)
            .waitUntilFinished(-800);
    sequence
        .effect()
            .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
            .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
            .file("jb2a.bullet.01.orange")
            .atLocation(sourceToken)
            .stretchTo(`impact${i}`, { randomOffset: 0.4, gridUnits: true })
            .repeats(7, 50)
            .scale(0.5)
            .waitUntilFinished();
    if (targetsMissed.has(target.id)) game.modules.get("lancer-weapon-fx").api.addMissToSequence(sequence, target.id);
    if (targetsCrit.has(target.id)) game.modules.get("lancer-weapon-fx").api.addCritToSequence(sequence, target.id);
}

sequence.play();
