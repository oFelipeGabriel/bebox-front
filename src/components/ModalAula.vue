<template>
    <b-modal v-if="aula!==null"
        title="Detalhes da aula" 
        v-model="exibir" 
        @hidden="resetModal"
        hide-footer>
        <div class="row" >
            <div class="col-6">
                <h3 class="my-4">{{aula.dia}}</h3>
            </div>
            <div class="col-6">
                <h3 class="my-4">{{aula.hora}}</h3>
            </div>
        </div>
        <ul class="list-group">
            <li v-for="(aluno, index) in aula.alunos" 
            :key="index"
            class="list-group-item">
                {{aluno.nome}}
            </li>
            <li>
                <b-button block @click="addExperimental">Adicionar aluno de aula experimental</b-button>
            </li>
        </ul>
    </b-modal>
</template>

<script>
export default{
    name: 'ModalAula',
    props: ['modelAula', 'aula'],
    data(){
        return {
            exibir: false
        }
    },
    methods:{
        resetModal(){
            this.$emit('resetModal')
        },
        addExperimental(){
            this.$emit('addExperimental', this.aula.id)
        }
    },
    watch:{
        modelAula(){
            this.exibir = this.modelAula
        }
    }
}
</script>

<style>

</style>