import React, { useState } from "react";
import { Thread, ThreadCategory, QNAThread } from "../types";

type SubmitThread = Partial<Thread> | Partial<QNAThread>;

interface ThreadFormProps {
  onSubmit: (thread: SubmitThread) => void;
  onCancel: () => void;
  initialData?: Thread | QNAThread;
}

const ThreadForm: React.FC<ThreadFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [category, setCategory] = useState<ThreadCategory>(
    initialData?.category ?? "THREAD"
  );
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);

    const baseData: Partial<Thread> = {
      title: title.trim(),
      category,
      description: description.trim(),
      creationDate: new Date().toISOString(),
      isLocked: false,
    };

    const payload: SubmitThread =
      category === "QNA"
        ? ({
            ...baseData,
            category: "QNA",
            isAnswered: false,
          } as Partial<QNAThread>)
        : baseData;

    try {
      await onSubmit(payload);
    } catch (error) {
      console.error("Error submitting thread:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="thread-form">
      <h2>{initialData ? "Edit Thread" : "Create New Thread"}</h2>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          required
          maxLength={200}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.currentTarget.value as ThreadCategory)}
          required
        >
          <option value="THREAD">Discussion</option>
          <option value="QNA">Question &amp; Answer</option>
        </select>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          required
          rows={5}
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ThreadForm;
