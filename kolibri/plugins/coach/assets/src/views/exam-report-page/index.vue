<template>

  <div>

    <div class="header">
      <h1>
        {{ $tr('examTakenby', { num: takenBy }) }}
      </h1>
      <h1>
        {{ $tr('averageScore', { num: averageScore }) }}
      </h1>
    </div>

    <div class="table-wrapper" v-if="!noExamData">
      <table class="roster">
        <caption class="visuallyhidden">{{$tr('examReport')}}</caption>
        <thead class="table-header">
          <tr>
            <th scope="col" class="table-text">{{ $tr('name') }}</th>
            <th scope="col" class="table-data">{{ $tr('status') }}</th>
            <th scope="col" class="table-data">{{ $tr('score') }}</th>
            <th scope="col" class="table-data">{{ $tr('group') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row" v-for="examTaker in examTakers">
            <th scope="row" class="table-text">
              <router-link :to="examDetailPageLink(examTaker.id)" class="table-name">
                {{examTaker.name}}
              </router-link>
            </th>
            <td class="table-data" v-if="examTaker.progress === exam.question_count">{{ $tr('completed') }}</td>
            <td class="table-data incomplete" v-else-if="examTaker.progress">
              {{ $tr('incomplete', { num: examTaker.progress, outOf: exam.question_count }) }}
            </td>
            <td class="table-data incomplete" v-else>{{ $tr('notstarted') }}</td>
            <td class="table-data">{{ $tr('scorePercentage', { num: examTaker.score/exam.question_count }) }}</td>
            <td class="table-data">{{ examTaker.group.name || $tr('ungrouped') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else>{{ $tr('noExamData') }}</p>

  </div>

</template>


<script>

  const constants = require('../../constants');
  const actions = require('../../state/actions/exam');

  module.exports = {
    computed: {
      noExamData() {
        return this.examTakers.length === 0;
      },
      averageScore() {
        return Math.round(this.examTakers.reduce((acc, examTaker) => acc + examTaker.score, 0)
          / this.takenBy);
      },
      takenBy() {
        return this.examTakers.reduce(
          (acc, taker) => (acc + (taker.progress > 0 ? 1 : 0)), 0);
      }
    },
    methods: {
      examDetailPageLink(id) {
        return {
          name: constants.PageNames.EXAM_REPORT_DETAIL_ROOT,
          params: {
            classId: this.classId,
            channelId: this.channelId,
            examId: this.exam.id,
            userId: id
          },
        };
      },
    },
    vuex: {
      getters: {
        examTakers: state => state.pageState.examTakers,
        classId: state => state.pageState.classId,
        exam: state => state.pageState.exam,
        channelId: state => state.pageState.channelId,
      },
      actions: {
        displayExamModal: actions.displayExamModal,
      },
    },
    $trNameSpace: 'examReportPage',
    $trs: {
      examTakenby: 'Exam taken by: {num, plural, one {# learner} other {# learners}}',
      averageScore: 'Average Score: {num, number, percent}',
      examReport: 'Exam report',
      completed: 'Completed',
      incomplete: '{ num, number } out of { outOf, number }',
      notstarted: 'Not started',
      name: 'Name',
      status: 'Status',
      score: 'Score',
      scorePercentage: '{num, number, percent}',
      group: 'Group',
      noExamData: 'No data to show.',
      ungrouped: 'Ungrouped',
    },
  };

</script>


<style lang="stylus" scoped>

  @require '~kolibri.styles.definitions'

  .roster
    width: 100%
    border-spacing: 8px
    border-collapse: collapse

  .table-wrapper
    overflow-x: auto

  thead th
    color: $core-text-annotation
    font-size: smaller
    font-weight: normal

  .table-row
    height: 40px
    border-bottom: 2px solid $core-text-disabled

  .table-text
    text-align: left

  .table-data
    text-align: center

  .incomplete
    color: red

  .header
    position: relative
    padding-right: 150px
    margin-bottom: 16px

</style>