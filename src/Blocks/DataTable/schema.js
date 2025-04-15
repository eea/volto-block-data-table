import { capitalize } from 'lodash';

import config from '@plone/volto/registry';

const getColumnSchema = (fields = []) => ({
  title: 'Column def',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['field', 'headerName', 'dataType', 'widget', 'template'],
    },
  ],
  properties: {
    field: {
      title: 'Field',
      choices: fields.map((field) => [field, capitalize(field)]),
    },
    linkField: {
      title: 'Link field',
      description: 'Field to use as link. Leave empty to use column field',
      choices: fields.map((field) => [field, capitalize(field)]),
    },
    headerName: {
      title: 'Header name',
    },
    dataType: {
      title: 'Data type',
      choices: Object.keys(config.settings.table.renderers.dataType).map(
        (dataType) => [dataType, capitalize(dataType)],
      ),
    },
    widget: {
      title: 'Widget',
      choices: Object.keys(config.settings.table.renderers.widget).map(
        (widget) => [widget, capitalize(widget)],
      ),
    },
    template: {
      title: 'Template',
      description: 'Add suffix/prefix to text. Use {} for value placeholder',
    },
    linkTemplate: {
      title: 'Link template',
      description: 'Add suffix/prefix to text. Use {} for value placeholder',
    },
  },
  required: ['field'],
});

export const getSchema = (provider_data) => {
  const fields = Object.keys(provider_data || {});

  return {
    title: 'DataConnected Table',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'provider_url',
          'placeholder',
          'itemsPerPage',
          'variation',
          'columnDefs',
        ],
      },
      {
        id: 'settings',
        title: 'Settings',
        fields: [
          'withPagination',
          'withHeaders',
          'celled',
          'striped',
          'borderless',
          'compacted',
        ],
      },
      {
        id: 'data_query',
        title: 'Data query',
        fields: ['allowedParams', 'data_query'],
      },
    ],

    properties: {
      columnDefs: {
        title: 'Column defs',
        description: 'Leave empty to show all columns',
        schema: getColumnSchema(fields),
        schemaExtender: (schema, columnDef) => {
          if (columnDef.widget === 'link') {
            return {
              ...schema,
              fieldsets: [
                {
                  ...schema.fieldsets[0],
                  fields: [
                    ...schema.fieldsets[0].fields,
                    'linkField',
                    'linkTemplate',
                  ],
                },
              ],
            };
          }
          return schema;
        },
        widget: 'object_list',
      },
      provider_url: {
        title: 'Data provider',
        widget: 'internal_url',
      },
      allowedParams: {
        title: 'Allowed url params',
        type: 'array',
        creatable: true,
        items: {
          choices: [],
        },
      },
      data_query: {
        title: 'Data query',
        widget: 'data_query',
      },
      itemsPerPage: {
        title: 'Items per page',
        type: 'number',
      },
      placeholder: {
        title: 'Placeholder',
        widget: 'textarea',
        default: 'No results',
      },
      withPagination: {
        title: 'Toggle pagination',
        type: 'boolean',
        default: true,
      },
      withHeaders: {
        title: 'Toggle headers',
        type: 'boolean',
        default: true,
      },
      striped: {
        title: 'Stripe alternate rows with color',
        type: 'boolean',
      },
      borderless: {
        title: 'Remove table border',
        type: 'boolean',
      },
      celled: {
        title: 'Divide each row into separate cells',
        type: 'boolean',
      },
      compacted: {
        title: 'Make the table compact',
        type: 'boolean',
      },
      variation: {
        title: 'Variation',
        type: 'string',
        factory: 'Choice',
        choices: config.blocks.blocksConfig.data_table.variations.map(
          (variation) => [variation.id, variation.title],
        ),
      },
    },

    required: ['provider_url'],
  };
};
