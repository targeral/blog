function ts(cb) {
    if (cb.readOnly) cb.checked = cb.readOnly = false;
    else if (!cb.checked) cb.readOnly = cb.indeterminate = true;
}