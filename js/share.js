const btnEl = document.querySelector('.share-or-copy')

// 각 지원 기능 확인!
const isSupportedShare = !!navigator?.share
const isSupportedClipboard = !!navigator?.clipboard
const isSupportedClipboardCommand = document.queryCommandSupported?.('copy')

// 공유 및 복사 기능 상태 체크!
const healthEl = document.createElement('div')
healthEl.style.display = 'none'
healthEl.innerHTML = `s: ${isSupportedShare}, c: ${isSupportedClipboard}, cc: ${isSupportedClipboardCommand}`
document.body.append(healthEl)

// 모바일 브라우저 내장 공유 기능!
async function startNativeShare() {
  await navigator.share({
    title: '찐질문 연구소',
    text: '찐으로 재밌는 질문들만 모아둔 연구소',
    url: location.href // 현재 페이지 주소!
  })
}

// 주소 복사 기능!
async function copyToClipboard() {
  // 레거시 우선!
  if (isSupportedClipboardCommand) {
    const textarea = document.createElement('textarea')
    textarea.style.position = 'fixed'
    textarea.style.top = 0
    textarea.style.left = 0
    textarea.value = location.href

    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    document.execCommand('copy')
    document.body.removeChild(textarea)
    alert('URL이 복사되었습니다.')
    return
  }
  if (isSupportedClipboard) {
    await navigator.clipboard.writeText(location.href)
    alert('URL이 복사되었습니다.')
  }
}

// 모든 기능이 없는 경우 공유 버튼 제거!
if (!isSupportedShare && !isSupportedClipboard && !isSupportedClipboardCommand) {
  btnEl.style.display = 'none'
}

// 공유 버튼을 클릭했을 떄!
btnEl?.addEventListener('click', async function () {
  if (isSupportedShare) {
    await startNativeShare()
    return
  }
  if (isSupportedClipboard || isSupportedClipboardCommand) {
    await copyToClipboard()
  }
})