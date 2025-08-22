LootJS.modifiers(event => {
    const $LootDataType = Java.loadClass('net.minecraft.world.level.storage.loot.LootDataType')
    const lootData = Utils.server.getLootData()
    // this will be a list of all the resourcelocations.
    const allTables = lootData.getKeys($LootDataType.TABLE)
    // filter it for only stuff that contains chest
    const chestList = allTables.stream().filter(id => id.path.contains('chest')).map(id => id.toString()).toList()
    //Filter info: https://github.com/AlmostReliable/lootjs/wiki/1.20.1#ItemFilters
    const foodList = [ItemFilter.FOOD];

    allTables.forEach(id => {
        const modifier = event.addLootTableModifier(id)
        chestList.forEach(itemGroup => {
            modifier.modifyLoot(itemGroup, (context, stacks) => {
                return stacks.map(stack => {
                    stack.setCount(1);
                    return stack;
                });
            });
        });
        
        // // TESTING
        // modifier.addAlternativesLoot(
        //     LootEntry.of('minecraft:end_crystal', 32)
        // );
    });
});

// LootJS.modifiers(event => {
//     const $LootDataType = Java.loadClass('net.minecraft.world.level.storage.loot.LootDataType')
//     const lootData = Utils.server.getLootData();
//     const allTables = lootData.getKeys($LootDataType.TABLE);
//     const chestList = allTables.stream().filter(id => id.getPath().includes('chest')).map(id => id.toString()).toList();

//     chestList.forEach(id => {
//         const modifier = event.addLootTableModifier(id)
//             modifier.replaceLoot((context, originalLoot) => {
//                 return originalLoot.map(stack => {
//                     stack.setCount(1);
//                     return stack;
//                 });
//             });

//         // TESTING
//         modifier.addAlternativesLoot(
//             LootEntry.of('minecraft:end_crystal', 32)
//         );
//     });
// });