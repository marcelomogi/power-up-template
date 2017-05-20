


var queries = {

    getCardsByLevelAndCompetenceGroup(level, competenceGroup) {
        var queryStr = 'label:"' + level + '" label:"' + competenceGroup + '"';
        Trello.get('search', { 'modelTypes':'cards', 'query': queryStr }, success, error);
    }
};