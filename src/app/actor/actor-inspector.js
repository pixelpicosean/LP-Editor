import m from 'mithril';
import input from '../input/input';

export default {
  controller: function(args) {
    let c = {
      // = Attributes =====================================

      actor: args.actor,
      selected: args.selected,

      selectedIsNotRoot: function() {
        return c.actor().id !== c.selected().id;
      },

      // = Actions ========================================

      nameChanged: function(name) { c.selected().name(name); args.actorAttrChanged(c.selected()); },

      posXChanged: function(x) { c.selected().position.x(x); args.actorAttrChanged(c.selected()); },
      posYChanged: function(y) { c.selected().position.y(y); args.actorAttrChanged(c.selected()); }
    };

    return c;
  },
  view: function(controller) {
    return m('aside.sidebar.right.shadow', [
      m('header.header', 'Inspector'),
      m('div.content.y-overflow', [

        m('h2', 'GENERAL'),
        m('div.property-edit', [
          m('label', 'Name'),
          input('text', controller.selected().name, controller.nameChanged)
        ]),

        // Only non-root actors have these attributes
        controller.selectedIsNotRoot() ?
          m('div.property-edit', [
            m('label', 'Position'),
            input('number', controller.selected().position.x, controller.posXChanged),
            input('number', controller.selected().position.y, controller.posYChanged)
          ]) :
          ''
      ])
    ]);
  }
};