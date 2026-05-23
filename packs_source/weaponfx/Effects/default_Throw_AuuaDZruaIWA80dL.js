// Macro: Combat Knife Throw FX
const { targetsMissed, targetsCrit, targetTokens, sourceToken } = game.modules
    .get("lancer-weapon-fx")
    .api.getMacroVariables(this);

game.modules.get("lancer-weapon-fx").api.preloadMissAndCrit();

await Sequencer.Preloader.preloadForClients([
    "modules/lancer-weapon-fx/soundfx/bladeswing.ogg",
    "modules/lancer-weapon-fx/soundfx/bladehit.ogg",
    "jb2a.greatsword.throw",
    "jb2a.impact.001.blue",
]);

const volume = game.modules.get("lancer-weapon-fx").api.getEffectVolume(0.2);
const launchDelay = 500;
let delayAccumulator = 0;

for (const target of targetTokens) {
    let sequence = new Sequence();

    const isFacingLeft = target.x < sourceToken.x;
    sequence
        .sound()
            .file("modules/lancer-weapon-fx/soundfx/bladeswing.ogg")
            .volume(volume)
            .delay(750)
        .effect()
            .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
            .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
            .file("jb2a.greatsword.throw")
            .atLocation(sourceToken)
            .mirrorY(isFacingLeft)
            .stretchTo(target)
            .missed(targetsMissed.has(target.id))
            .waitUntilFinished(-700);

    if (!targetsMissed.has(target.id)) {
        sequence
            .effect()
                .xray(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreFogOfWar())
                .aboveInterface(game.modules.get("lancer-weapon-fx").api.isEffectIgnoreLightingColoration())
                .file("jb2a.impact.001.blue")
                .atLocation(target)
                .scale(0.5)
            .sound()
                .file("modules/lancer-weapon-fx/soundfx/bladehit.ogg")
                .volume(volume);
    }

    if (targetsMissed.has(target.id)) game.modules.get("lancer-weapon-fx").api.addMissToSequence(sequence, target.id);
    if (targetsCrit.has(target.id)) game.modules.get("lancer-weapon-fx").api.addCritToSequence(sequence, target.id);
    setTimeout(() => sequence.play(), launchDelay * delayAccumulator++);
}
