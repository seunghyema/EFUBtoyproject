import "./DeleteModal.css";

export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    // 배경 딤 처리 - 클릭하면 취소
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()} // 모달 안 클릭은 닫히지 않게
      >
        <h2 className="modal-title">Delete post?</h2>
        <p className="modal-desc">
          This can't be undone and it will be removed from your profile, the
          timeline of any accounts that follow you, and from search results.
        </p>

        <button className="modal-btn confirm" onClick={onConfirm}>
          Delete
        </button>
        <button className="modal-btn cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}