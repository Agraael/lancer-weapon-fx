const { targetsMissed, targetsCrit, targetTokens, sourceToken } = game.modules
    .get("lancer-weapon-fx")
    .api.getMacroVariables(this, typeof token !== "undefined" ? token : null);
game.modules.get("lancer-weapon-fx").api.preloadMissAndCrit();

const sequence = new Sequence();

// TODO implement sequence here!

sequence.play();
