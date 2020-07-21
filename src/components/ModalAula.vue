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
                <div class="row">
                    <div class="col-10">{{aluno.nome}}</div>
                    <div class="col-2"><b-button class="btn btn-danger" @click="removeAluno(aluno)">X</b-button></div>
                </div>
            </li>
            <li>
                <b-button block @click="addExperimental">Adicionar aluno de aula experimental</b-button>
            </li>
        </ul>
    </b-modal>
</template>

<script>
    import axios from "axios";
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
        },
        removeAluno({id}){
            axios.post(`aula/adminRemoveAluno/${this.aula.id}/${id}/`).then(res => {
                this.$emit('alunoRemovido', res.data);
            })
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