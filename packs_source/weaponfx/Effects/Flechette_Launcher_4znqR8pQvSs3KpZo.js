const { sourceToken } = game.modules
    .get("lancer-weapon-fx")
    .api.getMacroVariables(this, typeof token !== "undefined" ? token : null);
game.modules.get("lancer-weapon-fx").api.preloadMissAndCrit();

await Sequencer.Preloader.preloadForClients([
    "modules/lancer-weapon-fx/soundfx/Flechette.ogg",
    "jb2a.explosion.04.blue",
    "jb2a.impact.yellow",
]);

let sequence = new Sequence()

    .sound()
        .file("modules/lancer-weapon-fx/soundfx/Flechette.ogg")
        .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5))
    .effect()
        .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
        .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
        .file("jb2a.explosion.04.blue")
        .playbackRate(2)
        .atLocation(sourceToken)
        .waitUntilFinished()
    .effect()
        .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
        .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
        .file("jb2a.impact.yellow")
        .scale(0.5)
        .repeats(6, 20)
        .atLocation(sourceToken, { randomOffset: 2.2, gridUnits: true })
        .waitUntilFinished();

for (const target of targetTokens) {
    if (targetsMissed.has(target.id)) game.modules.get("lancer-weapon-fx").api.addMissToSequence(sequence, target.id);
    if (targetsCrit.has(target.id)) game.modules.get("lancer-weapon-fx").api.addCritToSequence(sequence, target.id);
}
sequence.play();
