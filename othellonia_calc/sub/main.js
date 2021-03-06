var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = ({
    fetch: function () {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function (todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
})


const app = new Vue({
    el: "#app",
    data: {
        todos: []
    },
    created() {
        this.todos = todoStoragel.fetch()
    },
    methods: {
        doAdd: function (event, value) {
            var comment = this.$refs.comment
            if (!comment.value.length) {
                return

            }
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            comment.value = ''
        }
    },
    watch: {
        todos: {
            handler: function (todos) {
                todoStorage.save(todos)
            },
            deep: true
        }
    }
})