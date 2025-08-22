ServerEvents.tags('item', event => {
    // Add all items with "potion" in their ID to the tag
    event.get('origins:ignore_diet').addAll(
        Item.getRegistry().filter(item => item.id.toString().includes('potion'))
    );
});