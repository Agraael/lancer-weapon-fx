const { targetsMissed, targetsCrit, targetTokens, sourceToken } = game.modules
    .get("lancer-weapon-fx")
    .api.getMacroVariables(this);
game.modules.get("lancer-weapon-fx").api.preloadMissAndCrit();

await Sequencer.Preloader.preloadForClients([
    "modules/lancer-weapon-fx/soundfx/BR_Fire.ogg",
    "jb2a.bullet.02.orange",
    "modules/lancer-weapon-fx/soundfx/AMR_Impact.ogg",
    "jb2a.impact.010.orange",
]);

let sequence = new Sequence();

for (let i = 0; i < targetTokens.length; i++) {
    let target = targetTokens[i];
    sequence
        .sound()
            .file("modules/lancer-weapon-fx/soundfx/BR_Fire.ogg")
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5))
            .duration(933)
            .delay(500)
        .effect()
            .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
            .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
            .file("jb2a.bullet.02.orange")
            .atLocation(sourceToken)
            .scale(0.7)
            .zIndex(1)
            .playbackRate(1.5)
            .stretchTo(target, { randomOffset: 0.6, gridUnits: true })
            .missed(targetsMissed.has(target.id))
            .name("hitLocation${i}")
            .delay(700)
            .waitUntilFinished(-800)
        .sound()
            .file("modules/lancer-weapon-fx/soundfx/AMR_Impact.ogg")
            .playIf(!targetsMissed.has(target.id))
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5))
        .effect()
            .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
            .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
            .file("jb2a.impact.010.orange")
            .playIf(!targetsMissed.has(target.id))
            .scaleToObject(1.5)
            .zIndex(2)
            .atLocation("hitLocation${i}")
            .rotateTowards(sourceToken)
            .rotate(230)
            .center();
    sequence
        .sound()
            .file("modules/lancer-weapon-fx/soundfx/BR_Fire.ogg")
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5))
            .duration(933)
            .delay(500)
        .effect()
            .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
            .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
            .file("jb2a.bullet.02.orange")
            .atLocation(sourceToken)
            .scale(0.7)
            .playbackRate(1.5)
            .stretchTo(target, { randomOffset: 0.6, gridUnits: true })
            .missed(targetsMissed.has(target.id))
            .name("hitLocation${i}")
            .delay(700)
            .waitUntilFinished(-800)
        .sound()
            .file("modules/lancer-weapon-fx/soundfx/AMR_Impact.ogg")
            .playIf(!targetsMissed.has(target.id))
            .volume(game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.5))
        .effect()
            .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
            .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
            .file("jb2a.impact.010.orange")
            .playIf(!targetsMissed.has(target.id))
            .scaleToObject(1.5)
            .atLocation("hitLocation${i}")
            .rotateTowards(sourceToken)
            .rotate(230)
            .center();
    if (targetsMissed.has(target.id)) game.modules.get("lancer-weapon-fx").api.addMissToSequence(sequence, target.id);
    if (targetsCrit.has(target.id)) game.modules.get("lancer-weapon-fx").api.addCritToSequence(sequence, target.id);
}
sequence.play();
