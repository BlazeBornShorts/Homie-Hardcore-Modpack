ServerEvents.loaded(event => {
    const $LootDataType = Java.loadClass('net.minecraft.world.level.storage.loot.LootDataType')
    
    let lootData = Utils.server.getLootData()
    // this will be a list of all the resourcelocations.
    let allTables = lootData.getKeys($LootDataType.TABLE)
    // filter it for only stuff that contains chest
    let filteredList = allTables.stream().filter(id => id.path.contains('chest')).map(id => id.toString()).toList()
    
    JsonIO.write('kubejs/exported/lootTables.json', {big_list: filteredList})
})