<template>
    <b-modal v-if="aulaModal!==null"
        title="Detalhes da aula" 
        v-model="exibir" 
        @hidden="resetModal"
        centered>
        <div class="row" >
            <div class="col-6">
                <h3 class="my-4">{{aulaModal.dia}}</h3>
            </div>
            <div class="col-6">
                <h3 class="my-4">{{aulaModal.hora}}</h3>
            </div>
        </div>
        <v-select 
        class="mb-3"
        :options="options"
        label="nome" 
        @search="fetchOptions"
        v-model="selected">
            <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                Nenhum resultado encontrado para <em>{{ search }}</em>.
                </template>
            </template>
            <template #no-options="{ search, searching, loading }">
                Nenhum resultado
              </template>
        </v-select>
        <ul class="list-group">
            <li v-for="(aluno, index) in aulaModal.alunos" 
            :key="index"
            class="list-group-item">
                <div class="row">
                    <div class="col-10">{{aluno.nome}}</div>
                    <div class="col-2"><b-button class="btn btn-danger" @click="removeAluno(aluno)">X</b-button></div>
                </div>
            </li>
            <li>
                
            </li>
        </ul>
        <template v-slot:modal-footer="{ ok }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button block @click="addExperimental">Adicionar aluno de aula experimental</b-button>
          </template>
    </b-modal>
</template>

<script>
    import axios from "axios";
export default{
    name: 'ModalAula',
    props: ['modelAula', 'aula'],
    data(){
        return {
            exibir: false,
            options: [],
            selected: null,
            aulaModal: null
        }
    },
    methods:{
        resetModal(){
            this.$emit('resetModal')
        },
        addExperimental(){
            axios.post(`aula/addAlunoExperimental/${this.aula.id}`).then(res => {
                this.$emit('addExperimental', res.data);
                let aula = res.data.filter(a => {return a.id==this.aula.id})
                this.aulaModal = aula[0]
            })
            //.$emit('addExperimental', this.aula.id)
        },
        removeAluno({id}){
            axios.post(`aula/adminRemoveAluno/${this.aula.id}/${id}/`).then(res => {
                this.$emit('addExperimental', res.data);
                let aula = res.data.filter(a => {return a.id==this.aula.id})
                this.aulaModal = aula[0]
            })
        },
        fetchOptions (search) {
            let body = {
                nome: search
            }
            axios.post(`usuario/buscaAluno`, body).then(res => {
                this.options = res.data.alunos
            })
        },
        adicionaAluno(id){
            axios.post(`aula/adminAddAluno/${this.aula.id}/${id}/`).then(res => {
                this.$emit('addExperimental', res.data);
                let aula = res.data.filter(a => {return a.id==this.aula.id})
                this.aulaModal = aula[0];
                this.selected = null;
            })
        }
    },
    watch:{
        modelAula(){
            this.exibir = this.modelAula;
            this.aulaModal = this.aula;
        },
        selected(){
            if(this.selected){
                this.adicionaAluno(this.selected.id)
            }
            
        }
    }
}
</script>

<style>
.modal-dialog,
.modal-content {
    /* 80% of window height */
    height: 80%;
}

.modal-body {
    /* 100% = dialog height, 120px = header + footer */
    max-height: calc(100% - 120px);
    overflow-y: auto;
}
</style>