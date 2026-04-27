<script setup lang="ts">
const links = [
  { kind: '商业 U 盘', label: '淘宝', url: 'https://e.tb.cn/h.ij8LYYB0cZPkNHw?tk=FMo05XEJYk0' },
  { kind: '商业 U 盘', label: '拼多多', url: 'https://mobile.yangkeduo.com/goods1.html?ps=WaQeS00tDn' },
  { kind: '商业 U 盘', label: '抖音', url: 'https://haohuo.jinritemai.com/ecommerce/trade/detail/index.html?id=3814862440735309865&origin_type=604' },
  { kind: '上游项目', label: 'NousResearch/hermes-agent', url: 'https://github.com/NousResearch/hermes-agent' },
  { kind: '中文 fork', label: 'dongsheng123132/u-hermes', url: 'https://github.com/dongsheng123132/u-hermes' },
  { kind: '商业站', label: 'u-hermes.org', url: 'https://u-hermes.org' },
  { kind: '友情站', label: 'OpenClaw 中文社区(clawd.org.cn)', url: 'https://clawd.org.cn' },
  { kind: '友情站', label: 'u-claw.org', url: 'https://u-claw.org' },
]
</script>

<template>
  <section class="hermes-section">
    <h2 class="hermes-h2">联系与赞助</h2>
    <p class="hermes-lead">扫码加微信群、关注小红书,或通过电商平台购买商业版 U 盘。</p>

    <div class="qr-row">
      <figure class="qr">
        <img src="/wechat-qr.jpg" alt="微信" />
        <figcaption>微信:hecare888</figcaption>
      </figure>
      <figure class="qr">
        <img src="/xhs-qr.jpg" alt="小红书" />
        <figcaption>小红书:U-Hermes 马盘</figcaption>
      </figure>
    </div>

    <h3 class="sub">链接</h3>
    <div class="link-grid">
      <a v-for="l in links" :key="l.url" :href="l.url" target="_blank" rel="noopener" class="link">
        <span class="kind">{{ l.kind }}</span>
        <span class="label">{{ l.label }}</span>
      </a>
    </div>

    <p class="note">
      赞助本站点(GitHub Sponsors / 爱发电)即将开放,届时会补充入口。
      暂时支持的话,直接购买马盘 U 盘或在 GitHub Star
      <a href="https://github.com/dongsheng123132/u-hermes" target="_blank" rel="noopener">u-hermes 仓库</a> ⭐ 即可。
    </p>
  </section>
</template>

<style scoped>
.qr-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 16px 0 32px;
}
.qr {
  margin: 0;
  text-align: center;
}
.qr img {
  width: 160px;
  height: 160px;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: #fff;
  padding: 8px;
}
.qr figcaption {
  font-size: 12.5px;
  color: var(--vp-c-text-2);
  margin-top: 8px;
}
.sub {
  font-size: 16px;
  font-weight: 600;
  margin: 16px 0 8px;
}
.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 8px;
}
.link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  font-size: 13px;
}
.link:hover {
  border-color: var(--vp-c-brand-2);
}
.kind {
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  padding: 2px 8px;
  border-radius: 999px;
}
.label {
  font-weight: 500;
}
.note {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 16px;
}
.note a {
  color: var(--vp-c-brand-1);
}
</style>
