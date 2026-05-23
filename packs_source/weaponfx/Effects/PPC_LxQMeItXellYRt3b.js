const { targetsMissed, targetsCrit, targetTokens, sourceToken } = game.modules
    .get("lancer-weapon-fx")
    .api.getMacroVariables(this);
game.modules.get("lancer-weapon-fx").api.preloadMissAndCrit();

await Sequencer.Preloader.preloadForClients([
    "modules/lancer-weapon-fx/soundfx/PPC2.ogg",
    "jb2a.chain_lightning.primary.blue",
]);

let sequence = new Sequence();

for (const target of targetTokens) {
    sequence
        .sound()
            .file("modules/lancer-weapon-fx/soundfx/PPC2.ogg")
            .delay(400)
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5));
    sequence
        .effect()
            .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
            .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
            .file("jb2a.chain_lightning.primary.blue")
            .scale(0.7)
            .atLocation(sourceToken)
            .stretchTo(target)
            .missed(targetsMissed.has(target.id));
    if (targetsMissed.has(target.id)) game.modules.get("lancer-weapon-fx").api.addMissToSequence(sequence, target.id);
    if (targetsCrit.has(target.id)) game.modules.get("lancer-weapon-fx").api.addCritToSequence(sequence, target.id);
}
sequence.play();
