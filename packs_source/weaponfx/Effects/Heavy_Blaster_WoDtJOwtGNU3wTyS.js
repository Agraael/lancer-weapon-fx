const { targetsMissed, targetsCrit, targetTokens, sourceToken } = game.modules
    .get("lancer-weapon-fx")
    .api.getMacroVariables(this);
game.modules.get("lancer-weapon-fx").api.preloadMissAndCrit();

await Sequencer.Preloader.preloadForClients([
    "modules/lancer-weapon-fx/soundfx/Annihilator_Charge.ogg",
    "jb2a.eldritch_blast.lightblue",
    "modules/lancer-weapon-fx/soundfx/AMR_Fire.ogg",
    "modules/lancer-weapon-fx/soundfx/AMR_Impact.ogg",
]);

let sequence = new Sequence();

for (const target of targetTokens) {
    sequence
        .effect()
            .file("jb2a.eldritch_blast.lightblue")
            .atLocation(sourceToken)
            .stretchTo(target)
            .missed(targetsMissed.has(target.id))
        .sound()
            .file("modules/lancer-weapon-fx/soundfx/Annihilator_Charge.ogg")
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5))
            .waitUntilFinished(-700);

    sequence
        .sound()
            .file("modules/lancer-weapon-fx/soundfx/AMR_Fire.ogg")
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5))
        .sound()
            .file("modules/lancer-weapon-fx/soundfx/AMR_Impact.ogg")
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5));

    if (targetsMissed.has(target.id)) game.modules.get("lancer-weapon-fx").api.addMissToSequence(sequence, target.id);
    if (targetsCrit.has(target.id)) game.modules.get("lancer-weapon-fx").api.addCritToSequence(sequence, target.id);
}

sequence.play();
