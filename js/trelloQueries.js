


var queries = {

    getCardsByLevelAndCompetenceGroup(level, competenceGroup) {
        var queryStr = 'label:"' + level + '" label:"' + competenceGroup + '"';
        return Trello.get('search', { 'modelTypes':'cards', 'query': queryStr });
    },

    getLabels() {
        return Trello.get('/boards/QhivfUn2/labels')
        .filter(function(label, index) {
            return (label.name == null || label.name == '');
        })
    },


};