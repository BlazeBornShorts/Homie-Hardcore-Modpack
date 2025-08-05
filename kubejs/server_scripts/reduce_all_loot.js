LootJS.modifiers(event => {
    // const $LootDataType = Java.loadClass('net.minecraft.world.level.storage.loot.LootDataType')
    // let lootData = Utils.server.getLootData()
    // // this will be a list of all the resourcelocations.
    // let allTables = lootData.getKeys($LootDataType.TABLE)
    // // filter it for only stuff that contains chest
    // let filteredList = allTables.stream().filter(id => id.path.contains('chest')).map(id => id.toString()).toList()
    // //Filter info: https://github.com/AlmostReliable/lootjs/wiki/1.20.1#ItemFilters
    // const itemList = [ItemFilter.FOOD];

    // filteredList.forEach(id => {
    //     const modifier = event.addLootTableModifier(id)
    //     // Halve the stack of all items in list
    //     itemList.forEach(itemGroup => {
    //         modifier.modifyLoot(itemGroup, (context, stacks) => {
    //             return stacks.map(stack => {
    //                 stack.count = 1;
    //                 return stack;
    //             });
    //         });
    //     });
        
    //     // TESTING: add 10% of of finding 1 beacon and a 75% of finding 3 (ONLY the first success is added)
    //     modifier.addAlternativesLoot(
    //         LootEntry.of('minecraft:netherite_ingot', 1).when((c) => c.randomChance(0.1)),
    //         LootEntry.of('minecraft:chain', 3).when((c) => c.randomChance(0.99))
    //     );
    // });
    event.getIds().forEach(id => {
        const table = event.get(id);
        if (!table) return;

        table.pools.forEach(pool => {
            pool.rolls = 1;
            pool.entries.forEach(entry => {
                if (entry.type === 'item') {
                    entry.functions ??= [];
                    // Add or override set_count function
                    entry.functions = entry.functions.filter(func => func.function !== 'set_count');
                    entry.functions.push({
                        function: 'set_count',
                        count: 1
                    });
                }
            });
        });
    });
});