<template>
  <PageCard title="防汛抗旱指挥部" bg-class="left">
    <section v-for="(group) in commandGroups" :key="group.title" class="role-group">
      <h3 class="role-title">
        <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
        <span>{{ group.title }}</span>
      </h3>

      <article v-for="member in group.members" :key="member.name" class="member-card">
        <p class="member-name">
          {{ member.name }}
        </p>
        <p class="member-duty">
          {{ member.duty }}
        </p>
      </article>
    </section>
  </PageCard>
</template>

<script setup lang="ts">
interface GroupMember {
  name: string
  duty: string
}

interface CommandGroup {
  title: string
  members: GroupMember[]
}

const commandGroups: CommandGroup[] = [
  {
    title: '指挥长',
    members: [
      { name: '陈俊峰', duty: '京山市市委书记、市委政法书记' }
    ]
  },
  {
    title: '副指挥长',
    members: [
      { name: '陈俊峰', duty: '京山市市委书记、市委政法书记' },
      { name: '向华军', duty: '省吴岭水库管理局党委副书记' }
    ]
  },
  {
    title: '副指挥长',
    members: [
      { name: '陈俊峰', duty: '京山市市委书记、市委政法书记' },
      { name: '向华军', duty: '省吴岭水库管理局党委副书记' },
      { name: '杨启林', duty: '省吴岭水库管理局党委委员、副书记' }
    ]
  }
]
</script>

<style lang="scss" scoped>
.role-group {
  &:not(:first-child) {
    margin-top: 22px;
  }
}

.role-title {
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 0 0 16px;
  font-size: 34px;
  line-height: 36px;
  font-weight: 400;
  color: #fff;
  font-family: JiangChengHeiTi, sans-serif;
}

.member-card {
  width: 100%;
  min-height: 122px;
  padding: 16px 43px 18px;
  background: rgb(52 98 143 / 0.6);
  margin-bottom: 19px;
  box-sizing: border-box;
}

.member-name {
  margin: 0 0 10px;
  font-size: 30px;
  line-height: 1.1;
  color: #c6f3ff;
  font-family: JiangChengHeiTi, sans-serif;
}

.member-duty {
  margin: 0;
  font-size: 28px;
  line-height: 1.35;
  color: #81e6ff;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
}
</style>
