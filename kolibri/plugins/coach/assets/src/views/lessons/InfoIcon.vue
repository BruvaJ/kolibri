<template>

  <div class="info-icon-container">
    <ui-icon
      ref="info-icon"
      icon="info_outline"
      class="info-icon"
      :iconAriaLabel="iconAriaLabel"
    />
    <ui-tooltip
      trigger="info-icon"
      class="info-icon-tooltip"
      :position="tooltipPosition"
    >
      {{ tooltipText }}
    </ui-tooltip>
  </div>

</template>


<script>

  import uiIcon from 'keen-ui/src/UiIcon';
  import uiTooltip from 'keen-ui/src/UiTooltip';

  export default {
    name: 'InfoIcon',
    components: {
      uiIcon,
      uiTooltip,
    },
    props: {
      iconAriaLabel: {
        type: String,
        required: true,
      },
      tooltipText: {
        type: String,
        required: true,
      },
      tooltipPosition: {
        type: String,
        required: true,
      },
    },
  };

</script>


<style lang="stylus" scoped>

  @require '~kolibri.styles.definitions'

  .info-icon-container
    display: inline-block

  .info-icon
    font-size: 1.2em
    vertical-align: top
    color: $core-accent-color
    cursor: pointer

</style>
