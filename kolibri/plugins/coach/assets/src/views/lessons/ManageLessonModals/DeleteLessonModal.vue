<template>

  <core-modal
    :title="$tr('deleteLesson')"
    @cancel="closeModal()"
  >
    <p>{{ $tr('lessonDeletionConfirmation', { title: lessonTitle }) }}</p>
    <div class="core-modal-buttons">
      <k-button
        :text="$tr('cancel')"
        appearance="flat-button"
        @click="closeModal()"
      />
      <k-button
        :text="$tr('delete')"
        :primary="true"
        @click="handleDeleteLesson()"
      />
    </div>
  </core-modal>

</template>


<script>

  import coreModal from 'kolibri.coreVue.components.coreModal';
  import kButton from 'kolibri.coreVue.components.kButton';
  import { LessonResource } from 'kolibri.resources';
  import { refreshClassLessons } from '../../../state/actions/lessons';
  import { LessonsPageNames } from '../../../lessonsConstants';
  import { createSnackbar } from 'kolibri.coreVue.vuex.actions';

  export default {
    name: 'deleteLessonModal',
    components: {
      coreModal,
      kButton,
    },
    methods: {
      closeModal() {
        return this.$emit('cancel');
      },
      goToLessonsRootPage() {
        return this.$router.replace({
          name: LessonsPageNames.ROOT,
          params: {
            classId: this.classId,
            lessonId: this.lessonId,
          },
        });
      },
      handleDeleteLesson() {
        return LessonResource.getModel(this.lessonId)
          .delete()
          ._promise.then(() => this.refreshClassLessons(this.classId))
          .then(() => {
            this.goToLessonsRootPage();
            this.createSnackbar({
              text: this.$tr('lessonDeleted'),
              autoDismiss: true,
            });
          })
          .catch(error => {
            // TODO handle error inside the current apge
            /* eslint-disable */
            console.log(error);
            /* eslint-enable */
          });
      },
    },
    vuex: {
      getters: {
        classId: state => state.classId,
        lessonId: state => state.pageState.currentLesson.id,
        lessonTitle: state => state.pageState.currentLesson.title,
      },
      actions: {
        refreshClassLessons,
        createSnackbar,
      },
    },
    $trs: {
      cancel: 'Cancel',
      delete: 'Delete',
      deleteLesson: 'Delete lesson',
      lessonDeletionConfirmation: "Are you sure you want to delete '{title}'?",
      lessonDeleted: 'Lesson deleted',
    },
  };

</script>


<style lang="stylus" scoped></style>
