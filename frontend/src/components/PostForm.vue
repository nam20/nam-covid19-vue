<template>
    <div>
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive}">
            <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                Bold
            </button>
        </editor-menu-bar>
        <editor-content :editor="editor" />
    </div>

</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Bold } from 'tiptap-extensions'
export default {
    components:{
        EditorContent, EditorMenuBar
    },
    data(){
        return {
            editor : null
        }
    },
    mounted(){
        this.editor = new Editor({
            extensions:[
                new Bold(),
            ],
        })
    },
    beforeDestroy(){
        this.editor.destroy()
    }
}
</script>

<style>

</style>