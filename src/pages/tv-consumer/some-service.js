import Chance from 'chance';

export let getPage = async (pageNumber) => {
  let chance = new Chance();
  return {
    rows: [...Array(3)].map(() => ({
      values: {
        name: chance.word(),
        page: {
          link: chance.url({domain: 'tyk.io'}),
          label: chance.word()
        },
        title: chance.word(),
        status: chance.pickone(['active', 'pending', 'inactive']),
        translate: chance.bool(),
        description: chance.sentence({words: 3}),
        views: chance.natural({min: 0, max: 15})
      },
      selected: false
    })),
    hasNext: pageNumber < 5
  };
};