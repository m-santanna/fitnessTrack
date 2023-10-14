import React from "react";

export default async function UserDisplay() {
  return (
    <details className="collapse bg-base-200">
      <summary className="collapse-title text-xl font-medium">
        click to show
      </summary>
      <div className="collapse-content">some content</div>
    </details>
  );
}
