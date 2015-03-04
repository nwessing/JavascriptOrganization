require.config({
    baseUrl: '/Scripts',
    paths: {
        jquery: 'node_modules/jquery/dist/jquery',
        underscore: 'node_modules/underscore/underscore',
        ko: 'node_modules/knockout/build/output/knockout-latest',
        KanbanViewModel: 'ViewModels/KanbanViewModel',
        KanbanBoard: 'ViewModels/KanbanBoard',
        TaskBoard: 'ViewModels/TaskBoard',
        KanbanApi: 'Api/KanbanApi'
    },
    shim: {
        "underscore": {
            exports: "_"
        }
    }
});